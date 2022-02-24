import {
  TeacherState,
  TeacherAction,
  TeacherActionType,
} from '../../../types/Teacher';

const initialState: TeacherState = {
  teacher: null,
  props: null,
  loading: false,
  error: null,
};

export const teacherReducer = (
  state: TeacherState = initialState,
  action: TeacherAction
): TeacherState => {
  switch (action.type) {
    case TeacherActionType.startGenerate:
      return {
        ...state,
        loading: true,
        teacher: action.payload,
      };
    case TeacherActionType.successGenerate:
      return {
        ...state,
        loading: false,
        props: action.payload,
      };
    case TeacherActionType.failGenerate:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TeacherActionType.setProps:
      return { ...state, props: action.payload };
    case TeacherActionType.removeTeacher:
      return { ...state, props: null, teacher: null };
    default:
      return state;
  }
};
