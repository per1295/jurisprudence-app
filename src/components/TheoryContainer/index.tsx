import styles from "./index.module.scss";

import { ThemeContext } from "../../contexts";
import { useContext } from "react";

interface IProps {
    theory_value: string;
}

export default function TheoryContainer({ theory_value }: IProps) {
    const theme = useContext(ThemeContext);
    const className = `${styles.theory_container} ${theme.value === "dark" || styles.theory_container_light}`;

    return(
        <div data-container={true} data-theory={theory_value} className={className}></div>
    )
}