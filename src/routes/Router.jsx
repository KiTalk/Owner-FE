import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PageTransition from "../components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition stableKey={false}>
      <Routes location={location}>
        
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
