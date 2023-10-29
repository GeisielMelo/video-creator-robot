import Queue from "bull";
import redisConfig from "../config/redis";
import QuizCreation from "../jobs/QuizCreation";

const quizCreationQueue = new Queue(QuizCreation.key, redisConfig);

quizCreationQueue.on("failed", (job) => {
  console.log("Job failed", job.data);
});

export default quizCreationQueue;
