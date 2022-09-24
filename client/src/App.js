import React, { useState } from "react";
import NavBar from "./components/Header";
import Home from "./pages/Home";
import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <SearchBar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
