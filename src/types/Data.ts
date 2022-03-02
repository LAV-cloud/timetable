import { Group } from './Group';
import { Teacher } from './Teacher';

export interface DataState {
  dataTypeCount: number;
  dataType: DataType;
  data: Teacher[] | Group[];
  loading: boolean;
  error: null | string;
}

export enum DataType {
  teachers = 'Учителя',
  groups = 'Группы',
}

export enum DataActionType {
  fetchData = 'FETCH_DATA',
  successFetchData = 'SUCCESS_FETCH_DATA',
  failFetchData = 'FAIL_FETCH_DATA',
  setDataType = 'SET_DATA_TYPE',
}

interface FetchData {
  type: DataActionType.fetchData;
}

interface SuccessFetchData {
  type: DataActionType.successFetchData;
  payload: Teacher[] | Group[];
}

interface FailFetchData {
  type: DataActionType.failFetchData;
  payload: string;
}

interface SetDataType {
  type: DataActionType.setDataType;
  payload: DataType;
}

export type DataAction =
  | FetchData
  | SuccessFetchData
  | FailFetchData
  | SetDataType;
