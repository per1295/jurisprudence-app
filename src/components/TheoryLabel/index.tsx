import styles from "./index.module.scss";

interface IProps {
    label: string;
}

export default function TheoryLabel({label}: IProps) {
    return(
        <span className={styles.theory_label}>
            {label}
        </span>
    )
}