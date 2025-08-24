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


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition stableKey={false}>
      <Routes location={location}>
        {/* 메인 홈페이지 */}
        <Route path="/" element={<LoginPage />}/>
        <Route path="/order" element={<OrderPage />}/>
        <Route path="/menu/list" element={<MenuListPage />}/>
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
