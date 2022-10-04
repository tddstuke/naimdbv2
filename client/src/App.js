import React, { useState } from "react";
import NavBar from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SingleMovie from "./pages/SingleMovie";
import SingleShow from "./pages/SingleShow";
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
          <Route path="/movieid/:id" element={<SingleMovie />} />
          <Route path="/showid/:id" element={<SingleShow />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
