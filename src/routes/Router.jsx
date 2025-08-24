import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PageTransition from "../components/PageTransition";
import LoginPage from "../pages/LoginPage.jsx";
import OrderPage from "../pages/OrderPage.jsx";
import MenuListPage from "../pages/MenuListPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute";


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition stableKey={false}>
      <Routes location={location}>
        {/* 메인 홈페이지 */}
        <Route path="/" element={<LoginPage />}/>
        <Route path="/order" element={
          <ProtectedRoute><OrderPage /></ProtectedRoute>
        }/>
        <Route path="/menu/list" element={
          <ProtectedRoute><MenuListPage /></ProtectedRoute>
        }/>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </PageTransition>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
