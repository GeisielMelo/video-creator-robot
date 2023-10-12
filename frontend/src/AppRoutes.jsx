import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./pages/main/Index";
import Login from "./pages/main/Login";
import RecoverPassword from "./pages/main/RecoverPassword";
import Register from "./pages/main/Register";
import Workbench from "./pages/main/Workbench";

import Home from "./pages/navigation/Home";
import StandardCreation from "./pages/navigation/StandardCreation";
import UserUpdate from "./pages/navigation/UserUpdate";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/email" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login/forgot-password" element={<RecoverPassword />} />
        <Route path="/" element={<Index />} />
        <Route path="*" element={<Login />} />

        <Route
          path="/home"
          element={
            <Workbench title="Home" page="0">
              <Home />
            </Workbench>
          }
        />
        <Route
          path="/video-quiz"
          element={
            <Workbench title="Standard Creation" page="1">
              <StandardCreation />
            </Workbench>
          }
        />
        <Route
          path="/user-update"
          element={
            <Workbench title="User Update" page="2">
              <UserUpdate />
            </Workbench>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
