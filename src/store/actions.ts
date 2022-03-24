import { ClassInfo } from "../Types";
import {
  ACTION_LOADING,
  ACTION_LOGIN,
  ACTION_SET_USER_NAME,
  ACTION_SET_USERCLASS_ID_LIST,
  ACTION_SET_CLASS_LIST,
} from "./actionType";

const setLoading = (bLoading: boolean) => ({
  type: ACTION_LOADING,
  payload: {
    loading: bLoading,
  },
});

const setLogin = (bLogin: boolean) => ({
  type: ACTION_LOGIN,
  payload: {
    login: bLogin,
  },
});

const setUserName = (name: string) => ({
  type: ACTION_SET_USER_NAME,
  payload: {
    userName: name,
  },
});

const setUserClassIdList = (classIds: string[]) => ({
  type: ACTION_SET_USERCLASS_ID_LIST,
  payload: { idList: classIds },
});

const setClassList = (classList: ClassInfo[]) => ({
  type: ACTION_SET_CLASS_LIST,
  payload: { classList },
});

export const actions = {
  setLoading,
  setLogin,
  setUserName,
  setUserClassIdList,
  setClassList,
};
