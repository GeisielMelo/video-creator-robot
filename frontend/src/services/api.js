import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

// User
export const createUser = async (name, lastName, email, password) => {
  return api.post("/users/", { name, lastName, email, password });
};

export const fetchUserData = async (email) => {
  return api.get(`/users/${email}/`);
};

// Sessions
export const createSession = async (email, password) => {
  return api.post("/sessions/", { email, password });
};

export const checkUserEmail = async (email) => {
  return api.get(`/sessions/${email}/`);
};
