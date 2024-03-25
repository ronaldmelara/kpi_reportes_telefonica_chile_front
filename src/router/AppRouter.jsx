import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<LoginPage />} />

          <Route path="register" element={<RegisterPage />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
