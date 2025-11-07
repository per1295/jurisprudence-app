import type { ReactNode } from "react";

export type WithChildren<Props = object> = {
    children: ReactNode;
} & Props;