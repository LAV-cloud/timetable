import { exportTeacherFile } from '../../functions/exportTeacher';
import { useActions } from '../../redux/hooks/useActions';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers';
import { Group, Lesson, TeacherProps } from '../../types/Teacher';
import Export from '../Export/Export';
import SelectYear from '../SelectYear/SelectYear';
import Table from '../Table/Table';
import styles from './Space.module.scss';

export default function TeacherSpace() {
  var { props, loading } = useTypedSelector((state: RootState) => state.item);
  props = props as TeacherProps;
  var { addWarning, setProps } = useActions();
  var year = props
    ? `${props!.year}-${props!.year + 1}`
    : new Date().getFullYear();
  var filename = props!.teacher!.fullName + year;

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
    props = props as TeacherProps;
    const tabs = props!.lessons.map((lesson: Lesson, i: number) => {
      return { id: i, name: lesson.name };
    });
    return tabs;
  }

  function getRows(): { id: number; name: string }[] {
    return props!.months.map((month: string, i: number) => {
      return { id: i, name: month };
    });
  }

  function getCols(): { id: number; name: string }[] {
    props = props as TeacherProps;
    return props!.lessons[props!.currentTabId].groups.map(
      (group: Group, i: number) => {
        return { id: i, name: group.print };
      }
    );
  }

  function getHours(): number[][] {
    const hours: number[][] = [];
    for (let i = 0; i < props!.months.length; i++) {
      hours.push([]);
      props = props as TeacherProps;
      props.lessons[props.currentTabId].groups.map((group: Group, x: number) => {
        hours[i].push(group.hours[i])
        return group;
      })
    }
    return hours;
  }

  return (
    <div className={styles.space}>
      <div className={styles.space__info}>
        <h1 className={styles.space__title}>{props.teacher!.fullName}</h1>
        <Export
          filename={filename}
          exportFile={exportTeacherFile}
          data={props}
        />
      </div>
      {props && (
        <div className={styles.space__year}>
          <SelectYear
            year={props.year}
            nextYear={nextYear}
            prevYear={prevYear}
          />
        </div>
      )}
      {!loading && (
        <Table
          rowTitle="Месяц"
          hours={getHours()}
          selectTabId={props.currentTabId}
          selectRowId={props.currentRowId}
          year={props.year}
          tabs={getTabs()}
          rows={getRows()}
          cols={getCols()}
        />
      )}
    </div>
  );
}
