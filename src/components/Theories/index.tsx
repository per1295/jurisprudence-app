import styles from './index.module.scss';

import Theory from "../Theory";
import Image from "../Image";

const CHESS_PIECES = [
    "Pawn", "Queen", "Bishop", "Rook", "Knight", "King"
].map(
    item => `${item}_White`
);
const THEORY_NAMES = [
    "Договорная",
    "Теологическая",
    "Психологическая",
    "Материалистическая",
    "Насилия",
    "Патриархальная"
];

export default function Theories() {
    return(
        <div className={styles.theories}>
            {CHESS_PIECES.map(
                (piece, index) => {
                    return(
                        <Theory theory_name={THEORY_NAMES[index]}>
                            <Image src={`/${piece}.png`} alt={piece} className={styles.piece}/>
                        </Theory>
                    )
                }
            )}
        </div>
    )
}