import styles from './index.module.scss';

import { ThemeContext } from '../../contexts';
import { useContext, useRef, useEffect } from 'react';
import type { TransitionEventHandler } from 'react';

import Theory from "../Theory";
import Image from "../Image";

const CHESS_PIECES = [
    "Pawn", "Queen", "Bishop", "Rook", "Knight", "King"
];
const THEORY_NAMES = [
    "Договорная",
    "Теологическая",
    "Психологическая",
    "Материалистическая",
    "Насилия",
    "Патриархальная"
];

export default function Theories() {
    const theme = useContext(ThemeContext);
    const pieces = CHESS_PIECES.map(piece => {
        return `${piece}_${theme.value === "light" ? "Black" : "White"}`
    });
    const theories_ref = useRef<HTMLDivElement>(null);

    const onTransitionEnd: TransitionEventHandler = event => {
        const image = event.currentTarget as HTMLImageElement;
        image.classList.remove(styles.piece_transition);
        console.log("End");
    }

    useEffect(() => {
        const theories = theories_ref.current as HTMLDivElement;

        if ( theme.value && theme.prevValue !== null ) {
            const images = theories.querySelectorAll("img");

            for ( const image of images ) {
                image.classList.add(styles.piece_transition);
            }
        }
    }, [theme.value, theme.prevValue]);

    return(
        <div ref={theories_ref} className={styles.theories}>
            {pieces.map(
                (piece, index) => {
                    return(
                        <Theory key={index} theory_name={THEORY_NAMES[index]}>
                            <Image src={`/${piece}.png`} alt={piece} className={styles.piece} onTransitionEnd={onTransitionEnd}/>
                        </Theory>
                    )
                }
            )}
        </div>
    )
}