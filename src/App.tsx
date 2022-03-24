import React, { FC } from "react";
import Login from "./components/Login";
import Loading from "./components/Loading";
import Home from "./components/Home";
import { store } from "./store/store";
import { actions } from "./store/actions";
import { connect } from "react-redux";
import { AppState } from "./Types";

const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  isLogin: state.isLogin,
});

const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  setLoading: (payload: boolean) => dispatch(actions.setLoading(payload)),
  setLogin: (payload: boolean) => dispatch(actions.setLogin(payload)),
});

interface AppProps {
  isLoading: boolean;
  isLogin: boolean;
}

const App: FC<AppProps> = (props) => {
  const { isLoading, isLogin } = props;
  return <div>{isLoading ? <Loading /> : isLogin ? <Home /> : <Login />}</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
