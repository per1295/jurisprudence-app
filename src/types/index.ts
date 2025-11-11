import type { ReactNode, Dispatch, SetStateAction } from "react";

export type WithChildren<Props = object> = {
    children: ReactNode;
} & Props;

export type GameTheme = "dark" | "light";

export interface IGameTheme {
    value: GameTheme;
    prevValue: GameTheme | null;
}

export type Theory = "Contractual" | "Theological" | "Psychological" | "Materialistic" | "Violence" | "Patriarchal";

export interface IScore {
    total: number;
    access: number | null;
}

export interface IScoreCtx {
    score: IScore;
    setScore: Dispatch<SetStateAction<IScore>>;
}

export type WindowSizeType = "mobile_tiny" | "mobile" | "tablet" | "desktop";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunc= (...args: any[]) => any;