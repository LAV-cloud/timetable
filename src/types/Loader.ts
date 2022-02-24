export interface LoaderState {
  loading: boolean;
  progress: number;
  text: string | null;
}

export enum LoaderActionType {
  startLoading = 'START_LOADING',
  partLoading = 'PART_LOADING',
  finishLoading = 'FINISH_LOADING',
  stopLoading = 'STOP_LOADING',
}

interface StartLoading {
  type: LoaderActionType.startLoading;
}

interface StopLoading {
  type: LoaderActionType.stopLoading;
}

interface PartLoading {
  type: LoaderActionType.partLoading;
  payload: LoadingPart;
}

interface FinishLoading {
  type: LoaderActionType.finishLoading;
}

export type LoaderAction =
  | StartLoading
  | PartLoading
  | FinishLoading
  | StopLoading;

export interface LoadingPart {
  progress: number;
  text: string;
}
