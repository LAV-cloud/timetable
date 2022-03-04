export interface ConfigState {
  dataType: DataType;
  typeSetting: TypeSetting[];
}

interface TypeSetting {
  type: DataType;
  name: string;
  export: boolean;
  exportAll: boolean;
}

export enum DataType {
  teachers = 0,
  groups = 1,
}

export enum ConfigActionType {
  setDataType = 'SET_DATA_TYPE_CONFIG',
}

interface SetDataTypeConfig {
  type: ConfigActionType.setDataType;
  payload: DataType;
}

export type ConfigAction = SetDataTypeConfig;
