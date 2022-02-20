import {
  TeacherState,
  TeacherAction,
  TeacherActionType,
} from '../../../types/Teacher';

const initialState: TeacherState = {
  teacher: null,
  props: null,
  loading: {
    toggle: false,
    progress: 0,
    text: null,
  },
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
        loading: { ...state.loading, toggle: true },
        teacher: action.payload,
      };
    case TeacherActionType.successGenerate:
      return {
        ...state,
        loading: { ...state.loading, toggle: false },
        props: action.payload,
      };
    case TeacherActionType.failGenerate:
      return {
        ...state,
        loading: { ...state.loading, toggle: false },
        error: action.payload,
      };
    case TeacherActionType.setProps:
      return { ...state, props: action.payload };
    case TeacherActionType.setLoadingState:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
