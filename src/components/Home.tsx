import React, { FC } from "react";
import "./Home.css";
import { store } from "../store/store";
import { actions } from "../store/actions";
import { connect } from "react-redux";
import ClassItem from "./ClassItem";
import { AppState, ClassInfo } from "../Types";

const mapStateToProps = (state: AppState) => ({
  classList: state.classList,
});

const mapDispatchToProps = (dispatch: typeof store.dispatch) => ({
  setLogin: (bLogin: boolean) => dispatch(actions.setLogin(bLogin)),
});

interface HomeProps {
  classList: ClassInfo[];
  setLogin: (bLogin: boolean) => void;
}

const Home: FC<HomeProps> = (props) => {
  const { classList, setLogin } = props;

  const handleLogout = () => {
    setLogin(false);
  };

  return (
    <div className="container">
      <div className="navbar">
        <input
          type="button"
          value="Log out"
          className="logout"
          onClick={handleLogout}
        />
      </div>
      <div className="classContainer">
        {classList.map((item: ClassInfo) => (
          <ClassItem id={item.name} info={item} />
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
