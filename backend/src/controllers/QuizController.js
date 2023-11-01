require("dotenv").config();
import mongoose from "mongoose";
import Quiz from "../models/Quiz";
import User from "../models/User";

class QuizController {
  // Fetch data from the quiz repository.
  async index(req, res) {
    try {
      const { userId } = req.params;
      const quizRepository = await Quiz.findOne({ userId: userId });

      if (!quizRepository) {
        return res.status(400).json({ error: "Quiz repository not found" });
      }
      return res.json(quizRepository.questions);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // Create or update the quiz repository.
  async create(userId, questions) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      let quizRepository = await Quiz.findOne({ userId: userId });

      const newQuestions = [];

      // Get only the question text from the questions json and push into the newQuestions array.
      questions.forEach((element) => {
        newQuestions.push(element.question);
      });

      if (!quizRepository) {
        quizRepository = await Quiz.create({
          userId: userId,
          questions: newQuestions,
        });
      } else {
        // If repository exists, add new questions to the repository.
        quizRepository.questions = quizRepository.questions.concat(newQuestions);
        await quizRepository.save();
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await mongoose.connection.close();
    }
  }
}

export default new QuizController();
