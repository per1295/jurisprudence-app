import styles from "./index.module.scss";

import { ThemeContext } from "../../contexts";
import { useContext, useRef } from "react";
import { useDragAndDrop } from "../../hooks";

import type { WithChildren, Theory } from "../../types";
import type { RefObject } from "react";

interface IProps {
    theory: Theory;
    zIndex: RefObject<number>;
}

export default function Statement({ children, theory, zIndex }: WithChildren<IProps>) {
    const theme = useContext(ThemeContext);
    const className = `${styles.statement} ${theme.value === "dark" || styles.statement_light}`;
    
    const statement_ref = useRef<HTMLSpanElement>(null);

    useDragAndDrop(statement_ref, zIndex);

    return(
        <span data-theory={theory} ref={statement_ref} className={className}>
            {children}
        </span>
    )
}