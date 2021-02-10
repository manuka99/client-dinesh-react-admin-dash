import palette from "./palette";

import typography from "./typography";
const DefaultTheme = {
  palette,
  typography,
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0.5em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "grey",
          // outline: "1px solid black",
        },
      },
    },
    MuiLink: {
      root: {
        cursor: "pointer",
      },
    },
  },
};

export default DefaultTheme;
