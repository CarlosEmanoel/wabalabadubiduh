import React from "react";
import "./styles/index.css";

import { Routes } from "./routes/Routes";

function App() {
  return <Routes isAuthorized={true} />;
}

export default App;
