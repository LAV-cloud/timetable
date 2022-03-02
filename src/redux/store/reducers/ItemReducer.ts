import { ItemAction, ItemActionType, ItemState } from '../../../types/Item';

const initialState: ItemState = {
  props: null,
  loading: false,
  error: null,
};

export const itemReducer = (
  state: ItemState = initialState,
  action: ItemAction
): ItemState => {
  switch (action.type) {
    case ItemActionType.startGenerate:
      return {
        ...state,
        loading: true,
      };
    case ItemActionType.successGenerate:
      return {
        ...state,
        loading: false,
        props: action.payload,
      };
    case ItemActionType.failGenerate:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ItemActionType.setProps:
      return { ...state, props: action.payload };
    case ItemActionType.removeProps:
      return { ...state, props: null };
    default:
      return state;
  }
};
