import styles from "./index.module.scss";

import Theories from "../Theories";

export default function Desk() {
    return(
        <main className={styles.deskboard}>
            <Theories />
        </main>
    )
}