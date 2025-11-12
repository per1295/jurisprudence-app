import styles from "./index.module.scss";

import Statement from "../Statement";
import Person from "../Person";

import { shuffle } from "../../functions";
import { useRef } from "react";

import type { Theory } from "../../types";

interface ITheoriesContentItem {
    type: "statement" | "person";
    theory: Theory;
}

interface IStatement extends ITheoriesContentItem {
    value: string;
}

interface IPerson extends ITheoriesContentItem {
    image: string;
    name: string;
    years: string;
}

const STATEMENTS: IStatement[] = [
    {
        type: "statement",
        value: "Государство - временное явление: после построения бессклассовго общества оно отомрет как ненужный",
        theory: "Materialistic"
    },
    {
        type: "statement",
        value: "Революция - закономерный способ смены одного типа института государства другим",
        theory: "Materialistic"
    },
    {
        type: "statement",
        value: `
            Естественное состояние - свобода, также хасс, войны и неопределённость, поэтому заключают договор, 
            отказываясь от части свобод в пользу государства, чтобы гарантировать защиту прав и стабильность.
        `,
        theory: "Contractual"
    },
    {
        type: "statement",
        value: "Государство - инструмент общего блага, а не угнетения.",
        theory: "Contractual"
    },
    {
        type: "statement",
        value: "Разделение властей и законы должны ограничивать произвол правителей.",
        theory: "Contractual"
    },
    {
        type: "statement",
        value: `Люди инстинктивно стремятся к подчинению автонитету, так как это снижает тревогу и даёт чувство защищённости.`,
        theory: "Psychological"
    },
    {
        type: "statement",
        value: `Власть правителя (или элиты) опирается на бессознательные механизмы - довение, поклонение силе, поиск отцовской фигуры`,
        theory: "Psychological"
    },
    {
        type: "statement",
        value: `Массовое сознание склонно идеализиовать лидевов, приписьвая им сверхзестественные качества (хавизма, избранность)`,
        theory: "Psychological"
    },
    {
        type: "statement",
        value: `
            Государство - результат военных завоеваний, а не добъовольного соглашения.
        `,
        theory: "Violence"
    },
    {
        type: "statement",
        value: `
            Власть основана на силе и принуждении, а не на законе или Божественной воле.
        `,
        theory: "Violence"
    },
    {
        type: "statement",
        value: "Правители устанавливают законы, чтобы укрепить своё господство и предотвратить восстания.",
        theory: "Violence"
    },
    {
        type: "statement",
        value: `Социальное неравенство и классы (рабы, крестьяне, аристократия) следствие завоеваний`,
        theory: "Violence"
    },
    {
        type: "statement",
        value: `Государство - это Большая семья, где правитель играет главы`,
        theory: "Patriarchal"
    },
    {
        type: "statement",
        value: `Власть основана на естественном авторитете старшего`,
        theory: "Patriarchal"
    },
    {
        type: "statement",
        value: `
            Подчинение правителю - естественное продолжение семейной иерархи
        `,
        theory: "Patriarchal"
    },
    {
        type: "statement",
        value: `
            Государственные законы и традиции формируются по аналоги с семейными
        `,
        theory: "Patriarchal"
    },
    {
        type: "statement",
        value: `
            Государство … Божественный институт, а не результат человеческого договова.
        `,
        theory: "Theological"
    },
    {
        type: "statement",
        value: `
            Правитель … наместник Бога на земле, его власть абсолютна и незыблема.
        `,
        theory: "Theological"
    },
    {
        type: "statement",
        value: `Законы и позядок основаны на фелигиозных нофмах (заповеди, шафиат).`,
        theory: "Theological"
    },
    {
        type: "statement",
        value: `Критика власти равнозначна греху против Божественной воли.`,
        theory: "Theological"
    },
];

const PERSONS: IPerson[] = [
    {
        type: "person",
        theory: "Psychological",
        image: "image_14",
        name: "Габриэль Тард",
        years: "1843-1904"
    },
    {
        type: "person",
        theory: "Psychological",
        image: "image_26",
        name: "Лев Петражицкий",
        years: "1907-1910"
    },
    {
        type: "person",
        theory: "Psychological",
        image: "image_27",
        name: "Габриэль Тард",
        years: "1843-1904"
    },
    {
        type: "person",
        theory: "Violence",
        image: "image_27",
        name: "Евгений Дюринг",
        years: "1833-1921"
    },
    {
        type: "person",
        theory: "Violence",
        image: "image_28",
        name: "Людвиг Гумполович",
        years: "1838-1909"
    },
    {
        type: "person",
        theory: "Patriarchal",
        image: "image_39",
        name: "Н.К. Михайловский",
        years: "1842-1904"
    },
    {
        type: "person",
        theory: "Patriarchal",
        image: "image_40",
        name: "Роберт Филмер",
        years: "1588-1653"
    },
    {
        type: "person",
        theory: "Patriarchal",
        image: "image_41",
        name: "Аристотель",
        years: "4 век до н.э."
    },
    {
        type: "person",
        theory: "Theological",
        image: "image_51",
        name: "Аврелий Августин",
        years: "354-430"
    },
    {
        type: "person",
        theory: "Materialistic",
        image: "image_53",
        name: "Фридрих Энгельс",
        years: "1820-1895"
    },
    {
        type: "person",
        theory: "Patriarchal",
        image: "image_54",
        name: "Фома аквинский",
        years: "1225-1274"
    },
];

const theories_content_items = shuffle([...STATEMENTS, ...PERSONS]);

// const THEORIES = [
//     "Contractual",
//     "Theological",
//     "Psychological",
//     "Materialistic",
//     "Violence",
//     "Patriarchal"
// ];

export default function TheoriesContent() {
    const zIndex = useRef(2);

    return(
        <div data-statements-container={true} className={styles.theories_content}>
            {theories_content_items.map(
                (item, index) => {
                    if ( item.type === "statement" ) {
                        const statement_item = item as IStatement;

                        return <Statement key={index} theory={statement_item.theory} zIndex={zIndex}>{statement_item.value}</Statement>;
                    } else {
                        const person_item = item as IPerson;

                        return (
                            <Person
                                key={index}
                                theory={person_item.theory}
                                zIndex={zIndex}
                                image={person_item.image}
                                name={person_item.name}
                                years={person_item.years}
                            />
                        )
                    }
                }
            )}
        </div>
    )
}