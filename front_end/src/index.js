import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Material-UI Imports Below
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#FFC07A",
      main: "#FF8F4C",
      dark: "#C7601E",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#629BA8",
      main: "#326D79",
      dark: "#00424D",
      contrastText: "#FFFFFF"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
