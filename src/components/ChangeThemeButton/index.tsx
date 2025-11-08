import styles from "./index.module.scss";

import { ThemeContext } from "../../contexts";
import { useContext } from "react";

export default function ChangeThemeButton() {
    const theme = useContext(ThemeContext);

    function onClick() {
        const newValue = theme.value === "dark" ? "light" : "dark";

        theme.change(newValue);
    }

    return(
        <button className={styles.change_theme} onClick={onClick}>Click</button>
    )
}