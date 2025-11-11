import { useEffect } from "react";
import { debounce } from "../../functions";

import type { Dispatch, SetStateAction } from "react";
import type { WindowSizeType } from "../../types";

interface IProps {
    setWindowSize: Dispatch<SetStateAction<WindowSizeType>>;
}

export default function WindowSizeObserver({setWindowSize}: IProps) {
    const handleWindowSize = () => {
        const width = window.innerWidth;

        if ( width < 578 ) setWindowSize("mobile_tiny");
        else if ( width < 768 ) setWindowSize("mobile");
        else if ( width < 992 ) setWindowSize("tablet");
        else setWindowSize("desktop");
    }

    useEffect(() => {
        const debouncedHandler = debounce(handleWindowSize, 150);

        window.addEventListener("load", handleWindowSize);
        window.addEventListener("resize", debouncedHandler);

        return () => {
            window.removeEventListener("load", handleWindowSize);
            window.removeEventListener("resize", debouncedHandler);
        }
    });

    return null;
}