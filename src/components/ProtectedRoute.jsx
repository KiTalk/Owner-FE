// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // 로그인 여부 확인

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
