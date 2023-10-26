import { Router } from "express";
import auth from "./middlewares/auth";

import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";
import FileController from "./controllers/FileController";
import QuizController from "./controllers/QuizController";

const routes = new Router();

routes.post("/users", UsersController.create);
routes.post("/sessions", SessionsController.create);
routes.get("/sessions/:email", SessionsController.show);

// Every route after this middleware will need a token.
routes.use(auth);

// Login
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.delete);
routes.get("/users/:id", UsersController.show);

// Files
routes.post("/files/download/", FileController.downloadFile);
routes.post("/files", FileController.createQuiz);
routes.get("/files/solicitation/:userId", FileController.fetchSolicitationData);

// Questions
routes.post("/questions", QuizController.create);
routes.get("/questions/:userId", QuizController.index);

export default routes;
