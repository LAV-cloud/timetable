import {
  TeachersState,
  TeachersAction,
  TeachersActionType,
} from '../../../types/Teacher';

const initialState: TeachersState = {
  teachers: [],
  loading: false,
  error: null,
};

export const teachersReducer = (
  state: TeachersState = initialState,
  action: TeachersAction
) => {
  switch (action.type) {
    case TeachersActionType.successFetchTeachers:
      return { ...state, loading: false, teachers: action.payload };
    case TeachersActionType.failFetchTeachers:
      return { ...state, loading: false, error: action.payload };
    case TeachersActionType.fetchTeachers:
      return { ...state, loading: true, error: null };
    default:
      return state;
  }
};
