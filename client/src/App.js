import React, { useState } from "react";
import NavBar from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SingleMovie from "./pages/SingleMovie";
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
          <Route path="/movie" element={<SingleMovie />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
