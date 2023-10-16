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

export const createQuestions = async (userId, questions) => {
  return api.post("/questions/", { userId, questions });
};

// ===== Test ===== //

// Standard Creation
export const createQuiz = async (questions) => {
  return api.post("/files/", { questions });
};

export const downloadImage = async () => {
  try {
    const response = await api.get("/files/", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "image.png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    console.log("Download bem-sucedido");
  } catch (error) {
    console.error("Erro ao baixar a imagem:", error);
  }
};
