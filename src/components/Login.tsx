import React, { FC } from "react";
import "./Login.css";
import { store } from "../store/store";
import { actions } from "../store/actions";
import { connect } from "react-redux";
import { authenticateUser, getClassList } from "../model/dataModel";
import { AppState, ClassInfo } from "../Types";

const mapStateToProps = (state: AppState) => ({
  userName: state.userName,
});

const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  setUserName: (userName: string) => dispatch(actions.setUserName(userName)),
  setLogin: (bLogin: boolean) => dispatch(actions.setLogin(bLogin)),
  setLoading: (bLoading: boolean) => dispatch(actions.setLoading(bLoading)),
  setUserClassIdList: (idList: string[]) =>
    dispatch(actions.setUserClassIdList(idList)),
  setClassList: (classList: ClassInfo[]) =>
    dispatch(actions.setClassList(classList)),
});

interface LoginProps {
  userName: string;
  setUserName: (userName: string) => void;
  setLogin: (bLogin: boolean) => void;
  setLoading: (bLoading: boolean) => void;
  setUserClassIdList: (idList: string[]) => void;
  setClassList: (classList: ClassInfo[]) => void;
}

const Login: FC<LoginProps> = (props) => {
  const {
    setUserName,
    userName,
    setLoading,
    setUserClassIdList,
    setLogin,
    setClassList,
  } = props;

  const updateUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleLogin = async () => {
    authenticateUser(
      userName,
      function onSuccess(classIds: string[]) {
        setLogin(true);
        setLoading(true);
        setUserClassIdList(classIds);
        getClassList(
          classIds,
          function onSuccess(classInfo: ClassInfo[]) {
            setLoading(false);
            setClassList(classInfo);
          },
          function onError() {
            window.alert("Error occured while loading data...");
          }
        );
      },
      function onFail() {
        window.alert("User does not exist");
      },
      function onError() {
        window.alert("Error occured in the API call");
      }
    );
  };

  return (
    <div className="login">
      <div>
        <span style={{ marginRight: "10px" }}>Student Name:</span>
        <input type="text" onChange={updateUserName} />
      </div>
      <div>
        <input
          type="button"
          style={{ marginTop: "10px" }}
          value="Login"
          onClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
