import styles from "./index.module.scss";

import { useContext, useRef } from "react";
import { ThemeContext } from "../../contexts";
import { useDragAndDrop } from "../../hooks";

import type { Theory } from "../../types";
import type { RefObject } from "react";

import Image from "../Image";

interface IProps {
    image: string;
    name: string;
    years: string;
    theory: Theory;
    zIndex: RefObject<number>;
}

export default function Person({ image, name, years, theory, zIndex }: IProps) {
    const theme = useContext(ThemeContext);
    const person_ref = useRef<HTMLDivElement>(null);
    const info_className = `${styles.person_inf} ${theme.value === "dark" || styles.person_inf_light}`;

    useDragAndDrop(person_ref, zIndex);

    return(
        <div ref={person_ref} data-theory={theory} className={styles.person}>
            <Image src={`/${image}.png`} alt={image} className={styles.pic} />
            <div className={info_className}>
                <span>{name}</span>
                <br/>
                <span>{years}</span>
            </div>
        </div>
        )
}