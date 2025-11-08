import styles from "./index.module.scss";

import { ThemeContext } from "../../contexts";
import { useContext } from "react";

interface IProps {
    label: string;
}

export default function TheoryLabel({label}: IProps) {
    const theme = useContext(ThemeContext);
    const className = `${styles.theory_label} ${theme.value === "dark" || styles.theory_label_light}`;

    return(
        <span className={className}>
            {label}
        </span>
    )
}