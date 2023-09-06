import React, { useState, useEffect, createContext } from "react";
import { api, createSession, createUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

    setUser(response.data.user);
    navigate("/");
  };

  const register = async (name, lastName, email, password) => {
    await createUser(name, lastName, email, password);
    const response = await createSession(email, password);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;

    setUser(response.data.user);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.common.Authorization = null;
    setUser(null);
    navigate("/login");
  };

  const contextData = {
    authenticated: !!user,
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
