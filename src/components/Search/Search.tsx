import styles from './Search.module.scss';
import useInput from '../../hooks/useInput';
import filterPath from '../../functions/filterPath';
import { useEffect } from 'react';
import { Teacher } from '../../types/Teacher';

interface SearchType {
    data: any[],
    placeholder?: string,
    style?: React.CSSProperties
    clear?: boolean
    getResult: Function
}

export default function Search({
    data,
    placeholder = "Search...",
    style = {},
    clear = true,
    getResult
}: SearchType) {
    const searchInput = useInput("");

    useEffect(() => {
        searchInData(searchInput.value().toLowerCase());
    }, [searchInput.value()])

    function searchInData(value: string) {
        const result: Teacher[] = [];
        if (value !== "") {
            data.map((item: Teacher) => {
                const firstName: string = filterPath(item, "firstName").toLowerCase(),
                    secondName: string = filterPath(item, "secondName").toLowerCase(),
                    thirdName: string = filterPath(item, "thirdName").toLowerCase();
                if (firstName.indexOf(value) > -1) {
                    result.push(item);
                } else if (secondName.indexOf(value) > -1) {
                    result.push(item);
                } else if (thirdName.indexOf(value) > -1) {
                    result.push(item);
                }
                return item;
            })
            getResult(result);
        } else {
            getResult(data);
        }
    }

    return (
        <div className={styles.search} style={style}>
            <input
                className={styles.search__input}
                placeholder={placeholder}
                {...searchInput.bind}
            />
            {clear && (
                <button
                    onClick={() => searchInput.clear()}
                    className={styles.search__clear}
                >
                    &times;
                </button>
            )}
        </div>
    )
}