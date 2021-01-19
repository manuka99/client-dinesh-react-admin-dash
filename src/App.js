import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./util/api";
import { connect } from "react-redux";
import { fetch_user_data } from "./Redux";
import ErrorModelsContainer from "./components/Modals/ErrorModelsContainer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AllRoutes } from "./Routes";
import Loading from "./Pages/Loading/Loading";
import { get_app_theme, set_app_theme } from "./util/themeService";
import DefaultTheme from "./assets/Theme/DefaultTheme";
import DarkTheme from "./assets/Theme/DarkTheme";

function App(props) {
  const navigate = useNavigate();

  console.log(` props.theme : ${props.theme}`);

  // const APP_THEME = createMuiTheme(
  //   props.theme === "dark" ? DarkTheme : DefaultTheme
  // );

  const APP_THEME_DATA = get_app_theme(props.theme);
  const APP_THEME = createMuiTheme(APP_THEME_DATA);

  useEffect(() => {
    api(true).get("/sanctum/csrf-cookie");
  }, []);

  useEffect(() => {
    props.fetch_user_data();
    if (props.login) navigate("/");
    if (props.logout) navigate("/login");
  }, [props.login, props.logout]);

  useEffect(() => {
    set_app_theme(APP_THEME_DATA);
  }, [props.theme]);

  return (
    <ThemeProvider theme={APP_THEME}>
      {props.loading ? (
        <Loading />
      ) : (
        <div className="App">
          <ErrorModelsContainer />
          {AllRoutes()}
        </div>
      )}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.currentUser.loading,
    login: state.currentUser.login,
    logout: state.currentUser.logout,
    theme: state.currentUser.theme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user_data: () => dispatch(fetch_user_data()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
