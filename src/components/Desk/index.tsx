import styles from "./index.module.scss";

import Theories from "../Theories";
import TheoriesContent from "../TheoriesContent";

import { ScoreContext, ThemeContext } from "../../contexts";
import { useContext, useRef, useEffect } from "react";

export default function Desk() {
    const theme = useContext(ThemeContext);
    const { setScore } = useContext(ScoreContext);
    const className = `${styles.deskboard} ${theme.value === "dark" || styles.deskboard_light}`;
    const desk_ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const desk = desk_ref.current as HTMLElement;
        const theories_content = desk.lastElementChild as HTMLDivElement;
        const theories = desk.firstElementChild as HTMLDivElement;

        const observer = new MutationObserver(() => {
            if ( !theories_content.children.length ) {
                const theories_conteiners = theories.querySelectorAll<HTMLDivElement>("[data-theory]");

                for (const container of theories_conteiners) {
                    Array
                        .from(container.children as HTMLCollectionOf<HTMLSpanElement>)
                        .forEach(statement => {
                            const statement_theory = statement.dataset.theory?.toLowerCase();
                            const conteineiner_theory = container.dataset.theory?.toLowerCase();
                            console.log("Count");
                            if ( statement_theory === conteineiner_theory ) {
                                setScore(score => ({...score, access: (score.access ?? 0) + 1}));
                            }
                        });
                }
            }
        });

        observer.observe(theories_content, {childList: true});

        return () => {
            observer.disconnect();
        }
    }, [setScore]);

    return(
        <main ref={desk_ref} className={className}>
            <Theories />
            <TheoriesContent />
        </main>
    )
}