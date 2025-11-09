import type { CSSProperties } from "react";

export function shuffle<ItemType>(list: ItemType[]): ItemType[] {
    const copy = [...list];

    const shuffle_func = () => +(Math.random() * 100).toFixed() - +(Math.random() * 100).toFixed();
    copy.sort(shuffle_func);

    return copy;
}

export function setCSSStyles<ElemType extends HTMLElement>(elem: ElemType, styles: CSSProperties) {
    for ( const [prop, value] of Object.entries(styles) ) {
        elem.style[prop as unknown as number] = value;
    }
}

export function removeCSSStyles<ElemType extends HTMLElement>(elem: ElemType, props: (keyof CSSProperties)[]) {
    for ( const prop of props ) {
        elem.style.removeProperty(prop);
    }
}

export function random(to: number): number;
export function random(from: number, to: number): number;
export function random(x1: number, x2?: number): number {
    if (typeof x2 === "undefined") {
        return Math.floor(Math.random() * (x1 + 1));
    } else {
        return Math.floor(Math.random() * (x2 - x1 + 1)) + x1;
    }
}