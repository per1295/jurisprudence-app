import type { TransitionEventHandler } from "react";

interface IProps {
    src: string;
    alt: string;
    className?: string;
    onTransitionEnd?: TransitionEventHandler;
}

export default function Image(props: IProps) {
    const { src, alt, className, onTransitionEnd  }= props;

    return(
        <img src={src} alt={alt} className={className} onTransitionEnd={onTransitionEnd} />
    )
}