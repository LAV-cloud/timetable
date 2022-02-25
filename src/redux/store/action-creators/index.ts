import * as NotificationActionCreators from './Notification';
import * as TeachersActionCreators from './Teachers';
import * as TeacherActionCreators from './Teacher';
import * as LoaderActionCreators from './Loader';
import * as ExportActionCreators from './Export';

export default {
  ...NotificationActionCreators,
  ...TeachersActionCreators,
  ...TeacherActionCreators,
  ...LoaderActionCreators,
  ...ExportActionCreators,
};
