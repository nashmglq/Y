import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux"; // making sure redux is availble to the app
//so the provider will PROVIDE THE STATE TO ALL USING THE VALUE OF STORE
import store from "./store"; // this store the state

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* This makes Redux available to all components and provides the store for state management */}
    {/* `store={store}`: The first `store` is the prop name expected by `Provider`, and the second `store` is the actual Redux store being passed as the value */}

    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
