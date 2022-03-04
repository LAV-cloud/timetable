import { LoaderActionType } from '../types/Loader';
import { store } from '../redux/store';

export async function loading(cb: (props: any) => any, props?: any) {
  startLoading();
  await cb(props);
  if (!store.getState().loader.error) finishLoading();
}

const startLoading = () =>
  store.dispatch({ type: LoaderActionType.startLoading });

const finishLoading = () =>
  store.dispatch({ type: LoaderActionType.finishLoading });
