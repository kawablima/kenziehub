import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const RoutesMain = () => {
  const [authentication, setAuthentication] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("@token");
    if (!token) {
      setAuthentication(false);
    }
  }, [authentication]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Login setAuthentication={setAuthentication} />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<Dashboard setAuthentication={setAuthentication} />}
      />
    </Routes>
  );
};

export default RoutesMain;
