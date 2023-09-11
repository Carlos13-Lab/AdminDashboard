import React from "react";
import axios from "axios"
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";


axios.defaults.baseURL = "http://localhost:5000/api/demo";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
