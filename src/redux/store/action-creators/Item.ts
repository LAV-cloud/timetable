import { Dispatch } from 'redux';
import { store } from '..';
import { generateProps } from '../../../functions/generateProps';
import { ItemAction, ItemActionType } from '../../../types/Item';
import { LoaderAction, LoaderActionType } from '../../../types/Loader';
import { Teacher, TeacherProps } from '../../../types/Teacher';
import { Group, GroupProps } from '../../../types/Group';

export const setProps = (
  year?: number,
  currentRowId?: number,
  currentTabId?: number
) => {
  return (dispatch: Dispatch<ItemAction>) => {
    const { props }: { props: TeacherProps | GroupProps | null } =
      store.getState().item;
    dispatch({
      type: ItemActionType.setProps,
      payload: {
        ...props!,
        year: year ?? props!.year,
        currentRowId: currentRowId ?? props!.currentRowId,
        currentTabId: currentTabId ?? props!.currentTabId,
      },
    });
  };
};

export const generateTable = (object: Teacher | Group) => {
  return (dispatch: Dispatch<ItemAction | LoaderAction>) => {
    dispatch({
      type: ItemActionType.startGenerate,
    });
    const date = new Date();
    const year =
      date.getMonth() >= 8 ? date.getFullYear() : date.getFullYear() - 1;
    return generateProps(object, year).then(
      (props: TeacherProps | GroupProps | undefined) => {
        if (!props) dispatch({ type: ItemActionType.removeProps });
        if (props) finishGenerate(dispatch, props);
      }
    );
  };
};

function finishGenerate(
  dispatch: Dispatch<ItemAction | LoaderAction>,
  props: TeacherProps | GroupProps
) {
  dispatch({
    type: LoaderActionType.partLoading,
    payload: {
      progress: 100,
      text: `Завершено!`,
    },
  });
  setTimeout(() => {
    dispatch({
      type: ItemActionType.successGenerate,
      payload: props,
    });
  }, 500);
}
