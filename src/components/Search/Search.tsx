import styles from './Search.module.scss';
import useInput from '../../hooks/useInput';
import filterPath from '../../functions/filterPath';
import { useEffect } from 'react';
import { Teacher } from '../../types/Teacher';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { DataType } from '../../types/Data';
import { Group } from '../../types/Group';

interface SearchType {
    data: any[],
    placeholder?: string,
    style?: React.CSSProperties
    clear?: boolean
    getResult(result: any[]): void
}

export default function Search({
    data,
    placeholder = "Search...",
    style = {},
    clear = true,
    getResult
}: SearchType) {
    const searchInput = useInput("");
    const { dataType } = useTypedSelector((state: RootState) => state.data);

    useEffect(() => {
        searchInData(searchInput.value().toLowerCase());
    }, [searchInput.value()])

    function searchInData(value: string) {
        if (value !== "") {
            switch (dataType) {
                case DataType.teachers:
                    return searchTeacher(value);
                case DataType.groups:
                    return searchGroup(value);
            }
        } else {
            getResult(data);
        }
    }

    function searchTeacher(value: string) {
        const result: Teacher[] = [];
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
    }

    function searchGroup(value: string) {
        const result: Group[] = [];
        data.map((item: Group) => {
            const name: string = filterPath(item, "print").toLowerCase();
            if (name.indexOf(value) > -1) result.push(item);
            return item;
        })
        getResult(result);
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