import styles from './Select.module.scss';

interface OptionProps {
    selectOption: Function,
    option: any,
}

export default function Option(props: OptionProps) {
    return (
        <div
            onClick={() => props.selectOption(props.option.id)}
            className={styles.option}
        >
            {props.option}
        </div>
    )
}