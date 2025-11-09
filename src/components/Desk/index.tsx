import styles from "./index.module.scss";

import Theories from "../Theories";
import TheoriesContent from "../TheoriesContent";

import { ThemeContext } from "../../contexts";
import { useContext } from "react";

export default function Desk() {
    const theme = useContext(ThemeContext);
    const className = `${styles.deskboard} ${theme.value === "dark" || styles.deskboard_light}`;

    return(
        <main className={className}>
            <Theories />
            <TheoriesContent />
        </main>
    )
}