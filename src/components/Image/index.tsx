import type { TransitionEventHandler, MouseEventHandler } from "react";

interface IProps {
    src: string;
    alt: string;
    className?: string;
    onTransitionEnd?: TransitionEventHandler;
    onClick?: MouseEventHandler;
}

export default function Image(props: IProps) {
    const { src, alt, className, onTransitionEnd, onClick  }= props;

    return(
        <img src={src} alt={alt} className={className} onTransitionEnd={onTransitionEnd} onClick={onClick} />
    )
}