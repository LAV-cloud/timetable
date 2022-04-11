import { DataAction, DataActionType, DataState } from '../../../types/Data';

const initialState: DataState = {
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
        case DataActionType.resetFetchData:
            return { loading: false, error: null, data: [] };
        default:
            return state;
    }
};
