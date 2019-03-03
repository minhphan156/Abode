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
      light: "#4876a7",
      main: "#0c4b78",
      dark: "#00244c",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#88bced",
      main: "#568cba",
      dark: "#1f5f8a",
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
