import {
  ExportActionType,
  ExportAction,
  ExportMode,
} from '../../../types/Export';
import { Dispatch } from 'redux';
import { Teacher } from '../../../types/Teacher';

export function setExportCount(count: number) {
  return (dispatch: Dispatch<ExportAction>) => {
    dispatch({
      type: ExportActionType.setCount,
      payload: count,
    });
  };
}

export function setExportFilename(filename: string) {
  return (dispatch: Dispatch<ExportAction>) => {
    dispatch({
      type: ExportActionType.setFilename,
      payload: filename,
    });
  };
}

export function setExportYear(year: number) {
  return (dispatch: Dispatch<ExportAction>) => {
    dispatch({
      type: ExportActionType.setYear,
      payload: year,
    });
  };
}

export function setExportSelectData(data: Teacher[]) {
  return (dispatch: Dispatch<ExportAction>) => {
    dispatch({
      type: ExportActionType.setData,
      payload: data,
    });
  };
}

export function setExportMode(mode: ExportMode) {
  return (dispatch: Dispatch<ExportAction>) => {
    dispatch({ type: ExportActionType.setMode, payload: mode });
  };
}
