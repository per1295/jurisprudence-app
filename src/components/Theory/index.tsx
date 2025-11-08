import styles from "./index.module.scss";

import type { WithChildren } from "../../types";
import { ThemeContext } from "../../contexts";
import { useContext } from "react";

import TheoryLabel from "../TheoryLabel";
import TheoryContainer from "../TheoryContainer";

interface IProps {
    theory_name: string;
}

export default function Theory({children, theory_name}: WithChildren<IProps>) {
    const theme = useContext(ThemeContext);
    const className = `${styles.theory} ${theme.value === "dark" || styles.theory_light}`

    return(
        <section className={className}>
            {children}
            <TheoryLabel label={theory_name}/>
            <TheoryContainer />
        </section>
    )
}