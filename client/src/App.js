import React, { useState } from "react";
import NavBar from "./components/Header";
import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <SearchBar />
    </Router>
  );
}

export default App;
