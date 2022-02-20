import List from "./components/List/List";
import NotificationList from "./components/Notification/NotificationList";
import Space from "./components/Space/Space";
import { useActions } from "./redux/hooks/useActions";
import { useTypedSelector } from "./redux/hooks/useTypedSelector";
import { RootState } from "./redux/store/reducers";
import { useEffect } from 'react';
import { NotificationType } from "./types/Notification";
import { Loader } from './components/Loader/Loader';

function TimeTableApp() {
  const { loading, error } = useTypedSelector((state: RootState) => state.teachers);
  const { fetchTeachers, addNotification } = useActions();

  useEffect(() => {
    fetchTeachers();
  }, [])

  useEffect(() => {
    if (error) addNotification(NotificationType.error, error);
  }, [error])

  if (loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    )
  }

  if (!error) {
    return (
      <div className="content">
        <List />
        <Space />
        <NotificationList />
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
