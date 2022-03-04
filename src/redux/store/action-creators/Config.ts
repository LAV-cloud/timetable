import { Dispatch } from 'redux';
import { store } from '..';
import { ItemActionType } from '../../../types/Item';
import {
  DataType,
  ConfigAction,
  ConfigActionType,
} from '../../../types/Config';

export const setDataType = (type: DataType) => {
  return (dispatch: Dispatch<ConfigAction>) => {
    store.dispatch({ type: ItemActionType.removeProps });
    dispatch({
      type: ConfigActionType.setDataType,
      payload: type,
    });
  };
};
