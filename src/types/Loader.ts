export interface LoaderState {
    loading: boolean;
    error: boolean;
    progress: number;
    text: string | null;
}

export enum LoaderActionType {
    startLoading = 'START_LOADING',
    partLoading = 'PART_LOADING',
    finishLoading = 'FINISH_LOADING',
    stopLoading = 'STOP_LOADING',
    errorLoading = 'ERROR_LOADING',
}
interface ErrorLoading {
    type: LoaderActionType.errorLoading;
    payload: string;
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
    | StopLoading
    | ErrorLoading;

export interface LoadingPart {
    progress: number;
    text: string;
}
