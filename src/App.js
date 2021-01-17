import react from "react";
import Fruits from "./components/Fruits";
import Login from "./Pages/Login/Login";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import PanelContainer from "./Pages/Panel/PanelContainer";
import { isLoggedIn } from "./util/auth";
import api from "./util/api";
import { connect } from "react-redux";
import { fetch_user_data } from "./Redux";
import AuthRoute from "./components/protectedRoutes/AuthRoute";
import Error403 from "./Pages/Errors/Error403";
import Error404 from "./Pages/Errors/Error404";
import Error500 from "./Pages/Errors/Error500";
import ErrorModelsContainer from "./components/Modals/ErrorModelsContainer";
import Dashboard from "./Pages/App/Reports/Dashboard";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";

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
    <ThemeProvider theme={theme}>
      {props.loading ? (
        <h1> loading</h1>
      ) : (
        <div className="App">
          <ErrorModelsContainer />
          <AllRoutes />
        </div>
      )}
    </ThemeProvider>
  );
}

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace={true} to="/app" />} />
      <Route path="/login" element={<Login />} />
      <AuthRoute path="/app" element={<PanelContainer />}>
        <Route
          path="/"
          element={<Navigate replace={true} to="/app/reports/dashboard" />}
        />
        <Route path="/reports">
          <Route
            path="/"
            element={<Navigate replace={true} to="/app/reports/dashboard" />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/statistics" element={<Dashboard />} />
        </Route>
        <AuthRoute hasAnyRoles={["Editor"]} path="/fruits" element={<Fruits />}>
          <AuthRoute path="/fruit" element={<Fruits />} />
          <AuthRoute path="/login" element={<Login />} />
        </AuthRoute>
      </AuthRoute>

      <Route path="/403" element={<Error403 />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="/500" element={<Error500 />} />
      <Route path="/*" element={<Navigate replace={true} to="/404" />} />
    </Routes>
  );
};

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
