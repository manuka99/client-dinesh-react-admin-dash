import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../util/api";
import {
  isLoggedIn,
  LogOut as LogOutAuth,
  LogIn as LogInAuth,
} from "../util/auth";

function Login() {
  useEffect(() => {}, []);

  const Register = () => {
    api(true)
      .get("/sanctum/csrf-cookie")
      .then((response) => {
        // console.log(response)
        api()
          .post("/register", {
            name: "manuka",
            email: "manukayasas94@gmail.com",
            password: "12345678",
            password_confirmation: "12345678",
          })
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      });
  };

  const Login = () => {
    api(true)
      .post("/login", {
        email: "manukayasas99@gmail.com",
        password: "12345678",
      })
      .then((res) => {
        console.log(res);
        res.status === 200 && LogInAuth();
      })
      .catch((e) => console.log(e));
  };

  const Logout = () => {
    api(true)
      .post("/logout", {})
      .then((res) => {
        console.log(res);
        res.status === 204 && LogOutAuth();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={Register}>Register</button>
      {isLoggedIn() ? (
        <button onClick={Logout}>Logout</button>
      ) : (
        <button onClick={Login}>Login</button>
      )}
    </div>
  );
}

export default Login;
