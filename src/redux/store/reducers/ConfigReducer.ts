import { ConfigState, ConfigAction } from '../../../types/Config';

const initialState: ConfigState = {};

export function configReducer(
  state: ConfigState = initialState,
  action: ConfigAction
) {
  switch (action.type) {
    default:
      return state;
  }
}
