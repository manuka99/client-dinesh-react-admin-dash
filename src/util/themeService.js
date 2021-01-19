import DefaultTheme from "../assets/Theme/DefaultTheme";
import DarkTheme from "../assets/Theme/DarkTheme";
import store from "../Redux/store";
import { set_app_theme as set_app_theme_redux } from "../Redux";

export const get_app_theme = (theme = null) => {
  var app_theme = theme;
  app_theme === null && (app_theme = localStorage.getItem("theme"));
  app_theme === null && (app_theme = "light");

  app_theme === "dark" ? (app_theme = DarkTheme) : (app_theme = DefaultTheme);

  return app_theme;
};

export const set_app_theme = (theme = null) => {
  var theme_name = "light";
  theme !== null && theme === DarkTheme && (theme_name = "dark");
  if (theme !== null) {
    localStorage.setItem("theme", theme_name);
    store.dispatch(set_app_theme_redux(theme_name));
  }
};
