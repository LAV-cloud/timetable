import {
  ExportState,
  ExportAction,
  ExportActionType,
  ExportMode,
} from '../../../types/Export';

const date = new Date();

const initialState: ExportState = {
  count: 0,
  filename: 'Data',
  year: date.getMonth() >= 9 ? date.getFullYear() : date.getFullYear() - 1,
  selectData: [],
  mode: ExportMode.default,
};

export const exportReducer = (
  state: ExportState = initialState,
  action: ExportAction
) => {
  switch (action.type) {
    case ExportActionType.setCount:
      return { ...state, count: action.payload };
    case ExportActionType.setData:
      return { ...state, selectData: action.payload };
    case ExportActionType.setFilename:
      return { ...state, filename: action.payload };
    case ExportActionType.setYear:
      return { ...state, year: action.payload };
    case ExportActionType.setMode:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};
