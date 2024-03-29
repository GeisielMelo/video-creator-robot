import { Router } from "express";
import auth from "./middlewares/auth";

import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";
import FileController from "./controllers/FileController";
import QuizController from "./controllers/QuizController";
import SolicitationController from "./controllers/SolicitationController";

const routes = new Router();

routes.post("/users", UsersController.create);
routes.post("/sessions", SessionsController.create);
routes.get("/sessions/:email", SessionsController.show);

// Every route after this middleware will need a token.
routes.use(auth);

// Users
routes.put("/users", UsersController.update);
routes.delete("/users/:id", UsersController.delete);
routes.get("/users/:id", UsersController.show);

// Files
routes.get("/files/download/:userId/:solicitationNumber", FileController.downloadFile);
routes.post("/files", FileController.createQuiz);
routes.get("/files/solicitation/:userId", FileController.fetchSolicitationData);

// Solicitations
routes.get("/solicitations/:userId", SolicitationController.index);
routes.post("/solicitations", SolicitationController.create);

// Questions
routes.get("/questions/:userId", QuizController.index);

export default routes;
