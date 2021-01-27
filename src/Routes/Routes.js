import Fruits from "../components/Fruits";
import Login from "../Pages/Login/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import PanelContainer from "../Pages/Panel/PanelContainer";
import Dashboard from "../Pages/App/Reports/Dashboard";
import AuthRoute from "../components/protectedRoutes/AuthRoute";
import GuestRoute from "../components/protectedRoutes/GuestRoute";
import Error403 from "../Pages/Errors/Error403";
import Error404 from "../Pages/Errors/Error404";
import Error406 from "../Pages/Errors/Error406";
import Error500 from "../Pages/Errors/Error500";
import Profile from "../Pages/App/Profile/Profile";
import Account from "../Pages/App/Profile/Account";
import Security from "../Pages/App/Profile/Security/Security";
import Main from "../Pages/App/Profile/TwoStepVerification/Main";
import TwoFactorChallenge from "../Pages/TwoFactorChallenge/TwoFactorChallenge";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace={true} to="/app" />} />
      <GuestRoute path="/login" element={<Login />} />
      <GuestRoute
        path="/two-factor-challenge"
        element={<TwoFactorChallenge />}
      />
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
        <AuthRoute path="/profile" element={<Profile />}>
          <AuthRoute path="/" element={<Account />} />
          <AuthRoute path="/security" element={<Security />} />
          <AuthRoute path="/two-step-verification" element={<Main />} />
        </AuthRoute>
        <AuthRoute hasAnyRoles={["Editor"]} path="/fruits" element={<Fruits />}>
          <AuthRoute path="/fruit" element={<Fruits />} />
          <AuthRoute path="/login" element={<Login />} />
        </AuthRoute>
      </AuthRoute>

      <Route path="/403" element={<Error403 />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="/406" element={<Error406 />} />
      <Route path="/500" element={<Error500 />} />
      <Route path="/*" element={<Navigate replace={true} to="/404" />} />
    </Routes>
  );
};
