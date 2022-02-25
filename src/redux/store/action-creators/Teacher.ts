import {
  Teacher,
  TeacherAction,
  TeacherActionType,
  TeacherProps,
} from '../../../types/Teacher';
import { Dispatch } from 'redux';
import { store } from '..';
import { generateProps } from '../../../functions/generateProps';
import { LoaderAction, LoaderActionType } from '../../../types/Loader';

export const setProps = (
  year?: number,
  currentMonth?: number,
  currentLesson?: number
) => {
  return (dispatch: Dispatch<TeacherAction>) => {
    const { props }: { props: TeacherProps | null } = store.getState().teacher;
    dispatch({
      type: TeacherActionType.setProps,
      payload: {
        ...props!,
        year: year ?? props!.year,
        currentLesson: currentLesson ?? props!.currentLesson,
        currentMonth: currentMonth ?? props!.currentMonth,
      },
    });
  };
};

export const generateTable = (teacher: Teacher) => {
  return async (dispatch: Dispatch<TeacherAction | LoaderAction>) => {
    try {
      dispatch({
        type: TeacherActionType.startGenerate,
        payload: teacher,
      });
      console.log('TeacherId: ', teacher.id);
      const date = new Date();
      const year =
        date.getMonth() >= 8 ? date.getFullYear() : date.getFullYear() - 1;
      generateProps(teacher.id, year).then(
        (props: TeacherProps | undefined) => {
          if (!props) dispatch({ type: TeacherActionType.removeTeacher });
          if (props) finishGenerate(dispatch, props);
        }
      );
    } catch (e) {
      dispatch({
        type: TeacherActionType.failGenerate,
        payload: 'Произошла ошибка при загрузке данных учителя',
      });
      console.error(e);
    }
  };
};

function finishGenerate(
  dispatch: Dispatch<TeacherAction | LoaderAction>,
  props: TeacherProps
) {
  dispatch({
    type: LoaderActionType.partLoading,
    payload: {
      progress: 100,
      text: `Завершено!`,
    },
  });
  setTimeout(() => {
    store.dispatch({ type: LoaderActionType.finishLoading });
    dispatch({
      type: TeacherActionType.successGenerate,
      payload: props,
    });
  }, 500);
}
