import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./util/api";
import { connect } from "react-redux";
import { fetch_user_data } from "./Redux";
import ErrorModelsContainer from "./components/Modals/ErrorModelsContainer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { AllRoutes } from "./Routes/Routes";
import Loading from "./Pages/Loading/Loading";
import { get_app_theme, set_app_theme } from "./util/themeService";
import { useLocation } from "react-router-dom";

function App(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationRequired, setlocationRequired] = useState("");

  console.log(` props.theme : ${props.theme}`);

  // const APP_THEME = createMuiTheme(
  //   props.theme === "dark" ? DarkTheme : DefaultTheme
  // );

  const APP_THEME_DATA = get_app_theme(props.theme);
  const APP_THEME = createMuiTheme(APP_THEME_DATA);

  useEffect(() => {
    api(true).get("/sanctum/csrf-cookie");
    setlocationRequired(location.pathname);
    props.fetch_user_data();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.login) {
      locationRequired ? navigate(locationRequired) : navigate("/");
      setlocationRequired("");
    }
    if (props.logout) navigate("/login");
    // eslint-disable-next-line
  }, [props.login, props.logout]);

  useEffect(() => {
    navigate(props.redirect.route);
    // eslint-disable-next-line
  }, [props.redirect.status]);

  useEffect(() => {
    set_app_theme(APP_THEME_DATA);
    // eslint-disable-next-line
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
    redirect: state.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user_data: () => dispatch(fetch_user_data()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
