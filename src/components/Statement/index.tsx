import styles from "./index.module.scss";

import { ThemeContext } from "../../contexts";
import { useContext, useState, useEffect, useEffectEvent, useRef, useLayoutEffect } from "react";
import { removeCSSStyles, setCSSStyles, random } from "../../functions";

import type { WithChildren, Theory } from "../../types";
import type { RefObject } from "react";

interface IProps {
    theory: Theory;
    zIndex: RefObject<number>;
}

export default function Statement({ children, theory, zIndex }: WithChildren<IProps>) {
    const theme = useContext(ThemeContext);
    const className = `${styles.statement} ${theme.value === "dark" || styles.statement_light}`;

    const [isDraggingStart, setIsDraggingStart] = useState(false);
    const [startTouchCoords, setStartTouchCoords] = useState({x: 0, y: 0});
    const [prevStatementRectTop, setPrevStatementRectTop] = useState<number | null>(null);
    const startPositionalCoords = useRef({x: 0, y: 0});
    
    const statement_ref = useRef<HTMLSpanElement>(null);
    const timeout_ref = useRef<ReturnType<typeof setTimeout>>(null);

    const onStart = useEffectEvent((event: TouchEvent | MouseEvent) => {
        event.preventDefault();

        let touch: Touch | MouseEvent;

        if ( event.type === "touchstart" ) {
            touch = (event as TouchEvent).touches[0];
        } else {
            touch = event as MouseEvent;
        }

        const statement = statement_ref.current as HTMLSpanElement;

        if ( statement.parentElement?.dataset.theory ) {
            setCSSStyles(statement, {
                position: "absolute",
                top: startPositionalCoords.current.y + "px",
                left: startPositionalCoords.current.x + "px",
                fontSize: "1.2rem"
            });
            removeCSSStyles(statement, ["width"]);

            const statements_container = document.querySelector("[data-statements-container]") as HTMLDivElement;
            statements_container.append(statement);

            return;
        }

        const { top, left } = statement.getBoundingClientRect();

        setIsDraggingStart(true);
        setStartTouchCoords({
            x: touch.clientX - left,
            y: touch.clientY - top
        });

        const startX = statement.offsetLeft + "px";
        const startY = statement.offsetTop + "px";
        
        setCSSStyles(statement, {
            position: "absolute",
            top: startY,
            left: startX,
            zIndex: zIndex.current
        });

        zIndex.current++;
    })

    const onMove = useEffectEvent((event: TouchEvent | MouseEvent) => {
        requestAnimationFrame(() => {
            if ( !isDraggingStart ) return;
            event.preventDefault();

            const statement = statement_ref.current as HTMLSpanElement;
            const { top: top_client, left: left_client } = statement.getBoundingClientRect();
            
            let touch: Touch | MouseEvent;

            if ( event.type === "touchmove" ) {
                touch = (event as TouchEvent).touches[0];
            } else {
                touch = event as MouseEvent;
            }

            const top = statement.offsetTop + (touch.clientY - top_client) - startTouchCoords.y + "px";
            const left = statement.offsetLeft + (touch.clientX - left_client) - startTouchCoords.x + "px";

            setCSSStyles(statement, {
                top,
                left
            });

            // Прокрутка документа при переносе элемента
            if ( timeout_ref.current ) {
                clearTimeout(timeout_ref.current);
                timeout_ref.current = null;
            }

            const moving = 10;

            if (
                prevStatementRectTop &&
                Math.floor(prevStatementRectTop - top_client) >= 3 &&
                document.documentElement.scrollTop !== 0
            ) {
                timeout_ref.current = setTimeout(() => {
                    document.documentElement.scrollBy(0, -moving);

                    const { top } = getComputedStyle(statement);
                    setCSSStyles(statement, {
                        top: parseFloat(top) - moving + "px"
                    });
                    // setPrevStatementRectTop(top_client);
                }, 0);
            } else if (
                prevStatementRectTop &&
                Math.floor(prevStatementRectTop - top_client) <= -3 &&
                document.documentElement.scrollTop + top_client < document.documentElement.scrollHeight - 480
            ) {
                timeout_ref.current = setTimeout(() => {
                    document.documentElement.scrollBy(0, moving);

                    const { top } = getComputedStyle(statement);
                    setCSSStyles(statement, {
                        top: parseFloat(top) + moving + "px"
                    });
                    // setPrevStatementRectTop(top_client);
                }, 0);
            }

            setPrevStatementRectTop(top_client);
        });
    })

    const onEnd = useEffectEvent((event: TouchEvent | MouseEvent) => {
        if ( !isDraggingStart ) return;
        setIsDraggingStart(false);

        if ( timeout_ref.current ) {
            clearTimeout(timeout_ref.current);
            timeout_ref.current = null;
        }

        // Получаем контейнер теории
        const statement = statement_ref.current as HTMLSpanElement;
        let touch: Touch | MouseEvent;

        if ( event.type === "touchend" ) {
            touch = (event as TouchEvent).changedTouches[0];
        } else {
            touch = event as MouseEvent;
        }

        setCSSStyles(statement, { display: "none" });
        const elem = document.elementFromPoint(touch.clientX, touch.clientY);
        removeCSSStyles(statement, ["display"]);
        
        if ( elem ) {
            const theory_container = elem.closest("div[data-theory]") as HTMLDivElement | null;

            if ( theory_container ) {
                setCSSStyles(statement, {
                    position: "static",
                    width: "80%",
                    fontSize: "1rem"
                });
                removeCSSStyles(statement, ["top", "left"]);

                theory_container.append(statement);
            }
        }
    })

    // Установка обработчиков для мобильных устройств
    useEffect(() => {
        const statement = statement_ref.current as HTMLSpanElement;

        // Обработчики мобильных устройств и планшетов
        statement.addEventListener("touchstart", onStart, {passive: false});
        statement.addEventListener("touchend", onEnd, {passive: false});
        document.addEventListener("touchmove", onMove, {passive: false});

        // Обработчики мыши
        statement.addEventListener("mousedown", onStart, {passive: false});
        statement.addEventListener("mouseup", onEnd, {passive: false});
        document.addEventListener("mousemove", onMove, {passive: false});

        return () => {
            statement.removeEventListener("touchstart", onStart);
            statement.removeEventListener("touchend", onEnd);
            document.removeEventListener("touchmove", onMove);

            statement.removeEventListener("mousedown", onStart,);
            statement.removeEventListener("mouseup", onEnd);
            document.removeEventListener("mousemove", onMove);
        }
    }, [onEnd, onMove, onStart]);

    // Расположение statement в случайных координатах
    useLayoutEffect(() => {
        const statement = statement_ref.current;

        if (statement) {
            const parent_container = statement.parentElement as HTMLDivElement;
            const x = random(parent_container.clientWidth / 3) + statement.offsetWidth / 10;
            const y = random(parent_container.clientHeight / 2) + statement.offsetHeight / 2;
            startPositionalCoords.current = {x, y};

            setCSSStyles(statement, {
                top: y + "px",
                left: x + "px"
            });
        }
    }, []);

    return(
        <span data-theory={theory} ref={statement_ref} className={className}>
            {children}
        </span>
    )
}