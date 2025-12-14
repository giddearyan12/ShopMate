import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Inventory from "./pages/Inventory.jsx";
import Cart from "./pages/Cart.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminRoute from "./context/AdminRoute.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
            path="/admin/dashboard"
            element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
            }
        />
        <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
      </Routes>
    </div>
  );
}
export default App;

