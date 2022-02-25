import { Teacher } from './Teacher';

export interface ExportState {
  count: number;
  filename: string;
  year: number;
  selectData: Teacher[];
  mode: ExportMode;
}

export enum ExportActionType {
  setCount = 'SET_EXPORT_COUNT',
  setFilename = 'SET_EXPORT_FILENAME',
  setYear = 'SET_EXPORT_YEAR',
  setData = 'SET_EXPORT_DATA',
  setMode = 'SET_EXPORT_MODE',
}

interface SetExportMode {
  type: ExportActionType.setMode;
  payload: ExportMode;
}

interface SetExportCount {
  type: ExportActionType.setCount;
  payload: number;
}

interface SetExportFilename {
  type: ExportActionType.setFilename;
  payload: string;
}

interface SetExportYear {
  type: ExportActionType.setYear;
  payload: number;
}

interface SetExportData {
  type: ExportActionType.setData;
  payload: Teacher[];
}

export type ExportAction =
  | SetExportCount
  | SetExportData
  | SetExportFilename
  | SetExportYear
  | SetExportMode;

export enum ExportMode {
  default = 1,
  count = 2,
  select = 3,
}
