import React, { lazy, Suspense } from "react";
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
import ForgotPassword from "../Pages/Login/ForgotPassword";

// const Fruits = lazy(() => import("../components/Fruits"));
// const Login = lazy(() => import("../Pages/Login/Login"));
// const PanelContainer = lazy(() => import("../Pages/Panel/PanelContainer"));
// const Dashboard = lazy(() => import("../Pages/App/Reports/Dashboard"));
// const AuthRoute = lazy(() => import("../components/protectedRoutes/AuthRoute"));
// const GuestRoute = lazy(() =>
//   import("../components/protectedRoutes/GuestRoute")
// );
// const Error403 = lazy(() => import("../Pages/Errors/Error403"));
// const Error404 = lazy(() => import("../Pages/Errors/Error404"));
// const Error406 = lazy(() => import("../Pages/Errors/Error406"));
// const Error500 = lazy(() => import("../Pages/Errors/Error500"));

// const Profile = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(import("../Pages/App/Profile/Profile")), 3000);
//   });
// });
// const Account = lazy(() => import("../Pages/App/Profile/Account"));
// const Security = lazy(() => import("../Pages/App/Profile/Security/Security"));
// const Main = lazy(() =>
//   import("../Pages/App/Profile/TwoStepVerification/Main")
// );

// const TwoFactorChallenge = lazy(() =>
//   import("../Pages/TwoFactorChallenge/TwoFactorChallenge")
// );
// const ForgotPassword = lazy(() => import("../Pages/Login/ForgotPassword"));

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace={true} to="/app" />} />
      <GuestRoute path="/login" element={<Login />} />
      <GuestRoute path="/forgot-password" element={<ForgotPassword />} />
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
