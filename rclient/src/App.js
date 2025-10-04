import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import * as React from "react";

import "./App.css";
import { Reader } from "./features/Reader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Reader />} />
        <Route path="*" element={<h1>Wrong path</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
