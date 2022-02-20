import { Dispatch } from 'redux';
import { fetchData } from '../../../functions/fetch';
import {
  TeachersAction,
  TeachersActionType,
  Teacher,
} from '../../../types/Teacher';

interface ResponseType {
  status: boolean;
  data: {
    meta: {
      count: number;
      totalCount: number;
    };
    items: Teacher[];
  };
}

export const fetchTeachers = () => {
  return async (dispatch: Dispatch<TeachersAction>) => {
    try {
      dispatch({ type: TeachersActionType.fetchTeachers });
      const response: ResponseType = await fetchData(
        'account?offset=0&limit=100&scope=teacher'
      );
      response.data.items.map((item: Teacher) => {
        item.fullName = `${item.secondName} ${item.firstName[0]}.${item.thirdName[0]}.`;
        return item;
      });
      dispatch({
        type: TeachersActionType.successFetchTeachers,
        payload: response.data.items,
      });
    } catch (e) {
      dispatch({
        type: TeachersActionType.failFetchTeachers,
        payload: 'Произошла ошибка при загрузке данных',
      });
      console.error(e);
    }
  };
};
