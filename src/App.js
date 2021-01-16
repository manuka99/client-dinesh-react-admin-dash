import react from "react";
import Fruits from "./components/Fruits";
import Login from "./Pages/Login/Login";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Panel/Dashboard";
import { isLoggedIn } from "./util/auth";
import api from "./util/api";
import { connect } from "react-redux";
import { fetch_user_data } from "./Redux";
import AuthRoute from "./components/protectedRoutes/AuthRoute";
import Error403 from "./Pages/Errors/Error403";
import Error404 from "./Pages/Errors/Error404";
import ErrorModelsContainer from "./components/Models/ErrorModelsContainer";

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

  return props.loading ? (
    <h1> loading</h1>
  ) : (
    <div className="App">
      <ErrorModelsContainer />
      <AllRoutes />
    </div>
  );
}

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn() ? <Navigate to="/panel" /> : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={<Login />} />
      <AuthRoute path="/panel" element={<Dashboard />}>
        <Route path="/login" element={<Login />} />
        <AuthRoute
          hasAnyRoles={["Editor"]}
          path="/fruits/fruit"
          element={<Fruits />}
        />
      </AuthRoute>
      <Route path="/403" element={<Error403 />} />
      <Route path="/404" element={<Error404 />} />
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
