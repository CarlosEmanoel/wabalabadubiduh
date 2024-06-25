import React from "react";
import { Routes } from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "./styles/index.css";

function App() {
  return (
    <>
      <Routes isAuthorized={true} />
      <ToastContainer />
    </>
  );
}

export default App;
