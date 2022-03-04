import {
  LoaderState,
  LoaderAction,
  LoaderActionType,
} from '../../../types/Loader';

const initialState: LoaderState = {
  loading: false,
  error: false,
  progress: 0,
  text: null,
};

export const loaderReducer = (
  state: LoaderState = initialState,
  action: LoaderAction
) => {
  switch (action.type) {
    case LoaderActionType.startLoading:
      return {
        progress: 0,
        text: 'Начинаем обработку данных',
        loading: true,
        error: false,
      };
    case LoaderActionType.partLoading:
      return { ...state, ...action.payload };
    case LoaderActionType.finishLoading:
      return { ...state, progress: 100, text: 'Завершено!', loading: false };
    case LoaderActionType.stopLoading:
      return { ...state, loading: false };
    case LoaderActionType.errorLoading:
      return { ...state, text: action.payload, error: true };
    default:
      return state;
  }
};
