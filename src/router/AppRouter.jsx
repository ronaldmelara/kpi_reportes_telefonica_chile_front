import React from "react";
import { Routes, Route, Router, Navigate, BrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import { ReportsPage } from "../pages/ReportsPage";
import { EditDataPage } from "../pages/EditDataPage";

export default function AppRouter() {
  return (

    <>

      <Navbar />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <DashboardPage />

            }
          />
          <Route
            path="/reports"
            element={

              <ReportsPage />

            }
          />
          <Route
            path="/edit"
            element={<EditDataPage />}
          />

        </Route>

      </Routes>


    </>
  );
}
