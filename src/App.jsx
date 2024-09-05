import React from "react";
import Layout from "./utils/Layout";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Workshop from "./pages/Workshop";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin/dashboard/*"
            element={<ProtectedRoute Component={AdminDashboard} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const AdminDashboard = () => {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/workshops" element={<Workshop />} />
      </Routes>
    </Layout>
  );
};

export default App;
