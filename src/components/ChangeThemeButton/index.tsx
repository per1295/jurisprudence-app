import styles from "./index.module.scss";

import { ThemeContext } from "../../contexts";
import { useContext } from "react";

import type { TransitionEventHandler, MouseEventHandler } from "react";

import Image from "../Image";

export default function ChangeThemeButton() {
    const theme = useContext(ThemeContext);

    const pic = theme.value === "dark" ? "moon-stars" : "brightness";
    const src = `/${pic}.png`;

    const onClick: MouseEventHandler = event => {
        const image = event.currentTarget as HTMLImageElement;
        image.classList.add(styles.change_theme_transition);

        const newValue = theme.value === "dark" ? "light" : "dark";
        theme.change(newValue);
    }

    const onTransitionEnd: TransitionEventHandler = event => {
        event.preventDefault();
        const image = event.currentTarget as HTMLImageElement;
        image.classList.remove(styles.change_theme_transition);
    }

    const className = `${styles.change_theme} ${theme.value === "dark" || styles.change_theme_light}`;

    return(
        <Image src={src} alt={pic} className={className} onClick={onClick} onTransitionEnd={onTransitionEnd} />
    )
}