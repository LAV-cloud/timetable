import * as NotificationActionCreators from './Notification';
import * as DataActionCreators from './Data';
import * as ItemActionCreators from './Item';
import * as LoaderActionCreators from './Loader';
import * as ExportActionCreators from './Export';

export default {
  ...NotificationActionCreators,
  ...DataActionCreators,
  ...ItemActionCreators,
  ...LoaderActionCreators,
  ...ExportActionCreators,
};
