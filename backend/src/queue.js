import "dotenv/config";
import Queue from "./middlewares/queue";
import QuizCreation from "./jobs/QuizCreation";

Queue.process(QuizCreation.handle);
