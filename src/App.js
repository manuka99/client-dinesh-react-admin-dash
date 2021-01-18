import react from "react";
import { useNavigate } from "react-router-dom";
import api from "./util/api";
import { connect } from "react-redux";
import { fetch_user_data } from "./Redux";

import ErrorModelsContainer from "./components/Modals/ErrorModelsContainer";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { AllRoutes } from "./Routes";
import Loading from "./Pages/Loading/Loading";
import { createMuiTheme } from "@material-ui/core";

const darkTheme = createMuiTheme({

});

function App(props) {
  const navigate = useNavigate();

  react.useEffect(() => {
    api(true).get("/sanctum/csrf-cookie");
  }, []);

  react.useEffect(() => {
    props.fetch_user_data();
    if (props.login) navigate("/");
    if (props.logout) navigate("/login");
  }, [props.login, props.logout]);

  return (
    <ThemeProvider theme={darkTheme}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user_data: () => dispatch(fetch_user_data()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
