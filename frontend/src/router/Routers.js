import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//import Pages
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Upload from "../pages/Upload";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload/:role" element={<Upload />} />
    </Routes>
  );
};
export default Routers;
