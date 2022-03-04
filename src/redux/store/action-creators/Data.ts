import { Dispatch } from 'redux';
import { fetchData } from '../../../functions/fetch';
import { Teacher } from '../../../types/Teacher';
import { Group } from '../../../types/Group';
import { DataAction, DataActionType } from '../../../types/Data';
import { store } from '..';
import { LoaderActionType } from '../../../types/Loader';
import { DataType } from '../../../types/Config';

interface ResponseTeacherType {
  status: boolean;
  data: {
    meta: {
      count: number;
      totalCount: number;
    };
    items: Teacher[];
  };
}

interface ResponseGroupType {
  status: boolean;
  data: {
    meta: {
      count: number;
      totalCount: number;
    };
    items: Group[];
  };
}

export const fetchDataApp = () => {
  return async (dispatch: Dispatch<DataAction>) => {
    const { dataType } = store.getState().config;
    switch (dataType) {
      case DataType.groups:
        return await fetchGroups(dispatch);
      case DataType.teachers:
        return await fetchTeachers(dispatch);
      default:
        store.dispatch({ type: LoaderActionType.stopLoading });
        dispatch({
          type: DataActionType.failFetchData,
          payload: 'Указан несуществующий тип',
        });
    }
  };
};

async function fetchTeachers(dispatch: Dispatch<DataAction>) {
  try {
    dispatch({ type: DataActionType.fetchData });
    const response: ResponseTeacherType = await fetchData(
      'account?offset=0&limit=100&scope=teacher'
    );
    response.data.items.map((item: Teacher) => {
      item.fullName = `${item.secondName} ${item.firstName[0]}.${item.thirdName[0]}.`;
      return item;
    });
    dispatch({
      type: DataActionType.successFetchData,
      payload: response.data.items,
    });
  } catch (e) {
    dispatch({
      type: DataActionType.failFetchData,
      payload: 'Произошла ошибка при загрузке данных',
    });
    console.error(e);
  }
}

async function fetchGroups(dispatch: Dispatch<DataAction>) {
  try {
    dispatch({ type: DataActionType.fetchData });
    const response: ResponseGroupType = await fetchData(
      'group?offset=0&limit=100'
    );
    dispatch({
      type: DataActionType.successFetchData,
      payload: response.data.items,
    });
  } catch (e) {
    dispatch({
      type: DataActionType.failFetchData,
      payload: 'Произошла ошибка при загрузке данных',
    });
    console.error(e);
  }
}
