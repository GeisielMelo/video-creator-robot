import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
});

// User
export const createUser = async (name, lastName, email, password) => {
  return api.post("/users/", { name, lastName, email, password });
};

export const updateUserData = async (id, name, lastName, password) => {
  return api.put("/users/", { id, name, lastName, password });
};

export const fetchUserData = async (id) => {
  return api.get(`/users/${id}/`);
};

// Sessions
export const createSession = async (email, password) => {
  return api.post("/sessions/", { email, password });
};

export const checkUserEmail = async (email) => {
  return api.get(`/sessions/${email}/`);
};

// Quiz Questions
export const indexQuestions = async (userId) => {
  return api.get(`/questions/${userId}`);
};

// Solicitations
export const createSolicitation = async (userId, solicitationType) => {
  return api.post("/solicitations/", { userId, solicitationType });
};

export const fetchSolicitations = async (userId) => {
  return api.get(`/solicitations/${userId}`);
};

// Standard Creation
export const createQuiz = async (questions, userId, solicitationNumber) => {
  return api.post("/files/", { questions, userId, solicitationNumber });
};

// Downloads
export const downloadVideo = async (userId, solicitationNumber) => {
  return api.get(`/files/download/${userId}/${solicitationNumber}`);
};
