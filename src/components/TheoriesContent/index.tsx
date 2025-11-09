import styles from "./index.module.scss";

import Statement from "../Statement";
import { shuffle } from "../../functions";
import { useRef } from "react";

import type { Theory } from "../../types";

interface IStatement {
    value: string;
    theory: Theory;
}

let STATEMENTS: IStatement[] = [
    {
        value: "Statement 1",
        theory: "Contractual"
    },
    {
        value: "Statement 2",
        theory: "Psychological"
    },
    {
        value: "Statement 3",
        theory: "Violence"
    },
    {
        value: "Statement 4",
        theory: "Patriarchal"
    },
    {
        value: "Statement 5",
        theory: "Theological"
    },
    {
        value: "Statement 6",
        theory: "Materialistic"
    }
];
STATEMENTS = shuffle(STATEMENTS);

// const THEORIES = [
//     "Contractual",
//     "Theological",
//     "Psychological",
//     "Materialistic",
//     "Violence",
//     "Patriarchal"
// ];

export default function TheoriesContent() {
    const zIndex = useRef(2);

    return(
        <div className={styles.theories_content}>
            {STATEMENTS.map(
                (statement, index) => (
                    <Statement key={index} theory={statement.theory} zIndex={zIndex}>{statement.value}</Statement>
                )
            )}
        </div>
    )
}