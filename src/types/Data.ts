import { Group } from './Group';
import { Teacher } from './Teacher';

export interface DataState {
    data: Teacher[] | Group[];
    loading: boolean;
    error: null | string;
}

export enum DataActionType {
    fetchData = 'FETCH_DATA',
    successFetchData = 'SUCCESS_FETCH_DATA',
    failFetchData = 'FAIL_FETCH_DATA',
    resetFetchData = 'RESET_FETCH_DATA',
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

interface ResetFetchData {
    type: DataActionType.resetFetchData;
}

export type DataAction =
    | FetchData
    | SuccessFetchData
    | FailFetchData
    | ResetFetchData;
