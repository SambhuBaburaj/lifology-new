import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function LoggedInUser() {
  const user = localStorage.getItem("Userdata");

  return user ? <Navigate to="/" /> : <Outlet />;
}

export default LoggedInUser;
