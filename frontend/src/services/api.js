import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
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

// Quiz Questions
export const indexQuestions = async (userId) => {
  return api.get(`/questions/${userId}`);
};

export const createUsedQuestions = async (userId, questions) => {
  return api.post("/questions/", { userId, questions });
};

// Standard Creation
export const createQuiz = async (questions, userId, solicitationNumber) => {
  return api.post("/files/", { questions, userId, solicitationNumber });
};

// Find solicitations based on the user id.
export const fetchSolicitations = async (userId) => {
  return api.get(`/files/solicitation/${userId}`);
};

export const downloadVideo = async (userId, solicitationNumber, file) => {
  return api.post("/files/download/", { userId, solicitationNumber, file });
};
