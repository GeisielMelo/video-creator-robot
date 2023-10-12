import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { Loading } from "./components/Loading";

import Index from "./pages/main/Index";
import Login from "./pages/main/Login";
import RecoverPassword from "./pages/main/RecoverPassword";
import Register from "./pages/main/Register";
import Workbench from "./pages/main/Workbench";

import Home from "./pages/navigation/Home";
import StandardCreation from "./pages/navigation/StandardCreation";
import UserUpdate from "./pages/navigation/UserUpdate";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    return loading ? <Loading /> : authenticated ? children : <Navigate to="/sign-in" />;
  };

  const Public = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    return loading ? <Loading /> : authenticated ? <Navigate to="/" /> : children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<Public><Index /></Public>} />
          <Route path="/" element={<Public><Index /></Public>} />
          <Route path="/sign-in" element={<Public><Login /></Public>} />
          <Route path="/sign-up" element={<Public><Register /></Public>} />
          <Route path="/sign-up/forgot-password" element={<Public><RecoverPassword /></Public>} />

          <Route path="/home" element={<Private><Workbench title="Home" page="0"><Home /></Workbench></Private>} />
          <Route path="/video-quiz" element={<Private><Workbench title="Standard Creation" page="1"><StandardCreation /></Workbench></Private>} />
          <Route path="/user-update" element={<Private><Workbench title="User Update" page="2"><UserUpdate /></Workbench></Private>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
