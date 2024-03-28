import React from "react";
import { Routes, Route, Router, Navigate, BrowserRouter } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { HomePage } from "../pages/HomePage";
import { DashboardPage } from "../pages/DashboardPage";


export default function AppRouter2() {
  return (

<>
<Navbar />
      <Routes>
       
      <Route path="dashboard" element={<DashboardPage />} />
        <Route path="settings" element={<HomePage />} />
      </Routes>

      
      </>
  );
}
