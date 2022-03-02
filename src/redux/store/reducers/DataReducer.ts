import {
  DataAction,
  DataActionType,
  DataState,
  DataType,
} from '../../../types/Data';

const initialState: DataState = {
  dataTypeCount: 2,
  dataType: DataType.teachers,
  data: [],
  loading: false,
  error: null,
};

export const dataReducer = (
  state: DataState = initialState,
  action: DataAction
) => {
  switch (action.type) {
    case DataActionType.successFetchData:
      return { ...state, loading: false, data: action.payload };
    case DataActionType.failFetchData:
      return { ...state, loading: false, error: action.payload };
    case DataActionType.fetchData:
      return { ...state, loading: true, error: null };
    case DataActionType.setDataType:
      return { ...state, dataType: action.payload };
    default:
      return state;
  }
};
