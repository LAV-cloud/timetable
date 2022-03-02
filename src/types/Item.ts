import { GroupProps } from './Group';
import { TeacherProps } from './Teacher';

export interface ItemProps {
  currentRowId: number;
  currentTabId: number;
  year: number;
  months: string[];
}

export interface ItemState {
  props: TeacherProps | GroupProps | null;
  loading: boolean;
  error: string | null;
}

export enum ItemActionType {
  successGenerate = 'SUCCESS_GENERATE_ITEM',
  failGenerate = 'FAIL_GENERATE_ITEM',
  startGenerate = 'START_GENERATE_ITEM',
  setProps = 'SET_PROPS_ITEM',
  removeProps = 'REMOVE_PROPS_ITEM',
}

interface SuccessGenerate {
  type: ItemActionType.successGenerate;
  payload: TeacherProps | GroupProps;
}

interface RemoveProps {
  type: ItemActionType.removeProps;
}

interface FailGenerate {
  type: ItemActionType.failGenerate;
  payload: string;
}

interface StartGenerate {
  type: ItemActionType.startGenerate;
}

interface SetProps {
  type: ItemActionType.setProps;
  payload: TeacherProps | GroupProps;
}

export type ItemAction =
  | StartGenerate
  | SuccessGenerate
  | FailGenerate
  | SetProps
  | RemoveProps;
