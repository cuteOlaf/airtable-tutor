import {
  ACTION_LOADING,
  ACTION_LOGIN,
  ACTION_SET_USER_NAME,
  ACTION_SET_USERCLASS_ID_LIST,
  ACTION_SET_CLASS_LIST,
} from "./actionType";
import { AppState } from "../Types";

const initialState: AppState = {
  isLoading: false,
  isLogin: false,
  userName: "",
  userClassIds: [],
  classList: [],
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { payload } = action;
  switch (action.type) {
    case ACTION_LOADING:
      return { ...state, isLoading: payload.loading };
    case ACTION_LOGIN:
      return { ...state, isLogin: payload.login };
    case ACTION_SET_USER_NAME:
      return { ...state, userName: payload.userName };
    case ACTION_SET_USERCLASS_ID_LIST:
      return { ...state, userClassIds: payload.idList };
    case ACTION_SET_CLASS_LIST:
      return { ...state, classList: payload.classList };
    default:
      return state;
  }
};

export default userReducer;
