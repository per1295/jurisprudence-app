import styles from "./index.module.scss";

import type { WithChildren } from "../../types";

import TheoryLabel from "../TheoryLabel";
import TheoryContainer from "../TheoryContainer";

interface IProps {
    theory_name: string;
}

export default function Theory({children, theory_name}: WithChildren<IProps>) {
    return(
        <section className={styles.theory}>
            {children}
            <TheoryLabel label={theory_name}/>
            <TheoryContainer />
        </section>
    )
}