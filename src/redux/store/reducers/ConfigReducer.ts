import {
  ConfigState,
  ConfigAction,
  DataType,
  ConfigActionType,
} from '../../../types/Config';

const initialState: ConfigState = {
  dataType: DataType.teachers,
  typeSetting: [
    {
      type: DataType.teachers,
      name: 'Учителя',
      export: true,
      exportAll: true,
    },
    {
      type: DataType.groups,
      name: 'Группы',
      export: true,
      exportAll: false,
    },
  ],
};

export function configReducer(
  state: ConfigState = initialState,
  action: ConfigAction
) {
  switch (action.type) {
    case ConfigActionType.setDataType:
      return { ...state, dataType: action.payload };
    default:
      return state;
  }
}
