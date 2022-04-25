import { useActions } from '../../redux/hooks/useActions';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers';
import { GroupProps, Lesson } from '../../types/Group';
import Export from '../Export/Export';
import SelectYear from '../SelectYear/SelectYear';
import Table from '../Table/Table';
import styles from './Space.module.scss';
import { exportGroupFile } from '../../functions/exportGroup';
import { Day } from '../../types/Week';

export default function GroupSpace() {
    var { props, loading } = useTypedSelector((state: RootState) => state.item);
    props = props as GroupProps;
    var { addWarning, setProps } = useActions();
    var year = props
        ? `${props!.year}-${props!.year + 1}`
        : new Date().getFullYear();
    var filename = `${props!.group.print}_${year}`;

    function nextYear() {
        const date = new Date();
        if (
            props!.year + 1 === date.getFullYear() &&
            date.getMonth() < new Date(`1 Sep ${date.getFullYear()}`).getMonth()
        ) {
            addWarning('В будующее смотреть нельзя :(');
        } else {
            setProps(props!.year + 1);
        }
    }

    function prevYear() {
        if (props!.year === 2021) {
            addWarning('API: Меня тогда ещё не было');
        } else {
            setProps(props!.year - 1);
        }
    }

    function getTabs(): { id: number; name: string }[] {
        props = props as GroupProps;
        return props!.months.map((month: string, i: number) => {
            return { id: i, name: month };
        });
    }

    function getRows(): { id: number; name: string }[] {
        props = props as GroupProps;
        return props!.lessons[props!.currentTabId].map((lesson: Lesson, i: number) => {
            return { id: i, name: lesson.subgroup ? `${lesson.subject.name} (${lesson.teacher.secondName})` : lesson.subject.name };
        });
    }

    function getCols(): { id: number; name: string }[] {
        props = props as GroupProps;
        return props!.days[props!.currentTabId].map(
            (day: Day, i: number) => {
                return { id: i, name: day.id.toString() };
            }
        );
    }

    function getHours(): number[][] {
        const hours: number[][] = [];
        props = props as GroupProps;
        props.lessons[props.currentTabId].map((lesson: Lesson, i: number) => {
            hours.push(lesson.hours);
            return lesson;
        })
        return hours;
    }

    return (
        <div className={styles.space}>
            <div className={styles.space__info}>
                <h1 className={styles.space__title}>{props.group.print}</h1>
                <Export
                    filename={filename}
                    exportFile={exportGroupFile}
                    data={props}
                />
            </div>
            {!loading && (
                <>
                    <div className={styles.space__year}>
                        <SelectYear
                            year={props.year}
                            nextYear={nextYear}
                            prevYear={prevYear}
                        />
                    </div>
                    <Table
                        rowTitle="Предметы"
                        selectRowId={props.currentRowId}
                        selectTabId={props.currentTabId}
                        year={props.year}
                        tabs={getTabs()}
                        rows={getRows()}
                        cols={getCols()}
                        hours={getHours()}
                    />
                </>
            )}
        </div>
    );
}
