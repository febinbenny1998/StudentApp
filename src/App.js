import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CreateStudent from "./Routes/CreateStudent";
import ListStudent from "./Routes/ListStudent";
import EditStudent from "./Routes/EditStudent";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/create"} element={<CreateStudent />} />
        <Route path={"*"} element={<Navigate to={"/create"} replace />} />
        <Route path={"/listStudent"} element={<ListStudent />} />
        <Route path={"/edit"} element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
