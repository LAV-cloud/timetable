import List from "./components/List/List";
import NotificationList from "./components/Notification/NotificationList";
import Space from "./components/Space/Space";
import { useActions } from "./redux/hooks/useActions";
import { useTypedSelector } from "./redux/hooks/useTypedSelector";
import { RootState } from "./redux/store/reducers";
import { useEffect } from 'react';
import { Loader } from './components/Loader/Loader';
import ProgressBar from "./components/ProgressBar/ProgressBar";

function TimeTableApp() {
  const { loading, error, data } = useTypedSelector((state: RootState) => state.data);
  const { dataType } = useTypedSelector((state: RootState) => state.config);
  const { fetchDataApp, addError } = useActions();

  useEffect(() => {
    fetchDataApp();
  }, [dataType])

  useEffect(() => {
    if (error) addError(error);
  }, [error])

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    )
  }

  if (data) {
    return (
      <div className="content">
        <List />
        <Space />
        <NotificationList />
        <ProgressBar />
      </div>
    );
  }

  return (
    <div className="content">
      <NotificationList />
    </div>
  )
}

export default TimeTableApp;
