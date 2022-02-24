import { LoaderAction, LoaderActionType } from '../../../types/Loader';
import { Dispatch } from 'redux';

export function startLoading() {
  return (dispatch: Dispatch<LoaderAction>) => {
    dispatch({ type: LoaderActionType.startLoading });
  };
}
export function finishLoading() {
  return (dispatch: Dispatch<LoaderAction>) => {
    dispatch({ type: LoaderActionType.finishLoading });
  };
}

export function stopLoading() {
  return (dispatch: Dispatch<LoaderAction>) => {
    dispatch({ type: LoaderActionType.stopLoading });
  };
}
