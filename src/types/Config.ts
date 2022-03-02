import { DataType } from './Data';
export interface ConfigState {}

export enum ConfigActionType {
  setDataType = 'SET_DATA_TYPE_CONFIG',
}

interface SetDataTypeConfig {
  type: ConfigActionType.setDataType;
  payload: DataType;
}

export type ConfigAction = SetDataTypeConfig;
