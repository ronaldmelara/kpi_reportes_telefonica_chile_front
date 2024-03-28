import React from "react";
import { Routes, Route, Router, Navigate, BrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import  PrivateRoute  from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AppRouter2 from "./AppRouter2";


export default function AppRouter() {
  return (

<>

<Navbar/>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute/>}>
        <Route
          path="/dashboard"
          element={
              <DashboardPage />

          }
        />
        <Route
          path="/home"
          element={

              <HomePage />

          }
        />

        </Route>
        
      </Routes>

      
      </>
  );
}
