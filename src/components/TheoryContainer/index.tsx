import styles from "./index.module.scss";

import { ThemeContext } from "../../contexts";
import { useContext } from "react";

export default function TheoryContainer() {
    const theme = useContext(ThemeContext);
    const className = `${styles.theory_container} ${theme.value === "dark" || styles.theory_container_light}`;

    return(
        <div className={className}></div>
    )
}