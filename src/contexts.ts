import { createContext } from "react";

import type { IGameTheme, GameTheme } from "./types";

type ThemeContextType = IGameTheme & {
    change(value: GameTheme): void;
}

export const ThemeContext = createContext<ThemeContextType>({
    value: "dark",
    prevValue: null,
    change: (value: GameTheme) => value
});