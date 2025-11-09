import styles from "./index.module.scss";

import { useContext, useEffect } from "react";
import { ScoreContext } from "../../contexts";
import { setCSSStyles } from "../../functions";

import Image from "../Image";

interface IProps {
    shownScore: boolean;
}

const SUCCESS = [
    "Success_piece", "Success_libra", "Success_check"
];

const FAIL = [
    "Fail_piece", "Fail_libra", "Fail_cross"
];

export default function Score({ shownScore }: IProps) {
    const { score } = useContext(ScoreContext);
    const isSuccess = score.access ? Math.floor(score.access * 100 / score.total) >= 70 : false;
    const score_className = `${styles.score} ${shownScore && styles.score_appear } ${isSuccess ? styles.score_success : styles.score_fail}`;
    const score_statics_className = `${styles.score_statistics} ${isSuccess ? styles.score_statistics_success : styles.score_statistics_fail}`;
    const score_label_className = `${styles.score_label} ${isSuccess ? styles.score_success_color : styles.score_fail_color}`;
    const score_completed_className = `${styles.score_completed} ${isSuccess ? styles.score_success_color : styles.score_fail_color}`;
    const score_tip_className = `${styles.score_tip} ${isSuccess ? styles.score_tip_success : styles.score_tip_fail}`;

    const score_arr = isSuccess ? SUCCESS : FAIL;
    const score_tip_content = isSuccess ? "Молодец!" : "Старайся лучше!";

    // Запрещаем прокрукту страницы
    useEffect(() => {
        if ( shownScore ) {
            setCSSStyles(document.documentElement, {
                overflow: "hidden"
            });
        }
    }, [ shownScore ]);

    return(
        <div className={score_className}>
            <div className={score_statics_className}>
                <Image src={`/${score_arr[0]}.png`} alt={score_arr[0]} className={styles.score_statistics_img} />
                <Image src={`/${score_arr[1]}.png`} alt={score_arr[1]} className={styles.score_statistics_img} />
                <span className={score_label_className}>
                    {isSuccess ? "Успех" : "Неудача"}
                </span>
                <span className={score_completed_className}>
                    Выполненно {score.access} из {score.total} ({Math.floor((score.access ?? 0) * 100 / score.total)}%)
                </span>
                <Image src={`/${score_arr[2]}.png`} alt={score_arr[2]} className={styles.score_statistics_img} />
            </div>
            <span className={score_tip_className}>
                {score_tip_content}
            </span>
        </div>
    )
}