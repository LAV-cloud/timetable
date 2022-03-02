import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import TimeTableApp from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

declare global {
  interface Date {
    getWeek(): number;
  }
}

// eslint-disable-next-line no-extend-native
Date.prototype.getWeek = function () {
  var dt: Date = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(
    ((this.getTime() - dt.getTime()) / 86400000 + dt.getDay() + 1) / 7
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TimeTableApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
