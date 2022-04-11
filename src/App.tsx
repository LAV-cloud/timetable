import List from "./components/List/List";
import NotificationList from "./components/Notification/NotificationList";
import Space from "./components/Space/Space";
import { useActions } from "./redux/hooks/useActions";
import { useTypedSelector } from "./redux/hooks/useTypedSelector";
import { RootState } from "./redux/store/reducers";
import { useEffect } from 'react';
import { Loader } from './components/Loader/Loader';
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Layout from "./components/Layout/Layout";
import Retry from "./components/Retry/Retry";

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
      <Layout>
        <div className="loader">
          <Loader />
        </div>
      </Layout>
    )
  }

  if (!error && data) {
    return (
      <Layout>
        <div className="content">
          <List />
          <Space />
          <NotificationList />
          <ProgressBar />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="content">
        <Retry perform={fetchDataApp} error={error ?? "Произошла ошибка"} />
        <NotificationList />
      </div>
    </Layout>
  )
}

export default TimeTableApp;
