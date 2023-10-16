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
  async create(req, res) {
    try {
      const { userId, questions } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      let quizRepository = await Quiz.findOne({ userId: userId });

      if (!quizRepository) {
        // Se o repositório não existe, crie um novo
        quizRepository = await Quiz.create({
          userId: userId,
          questions: questions,
        });
      } else {
        // Se o repositório já existe, adicione as perguntas fornecidas
        quizRepository.questions = quizRepository.questions.concat(questions);
        await quizRepository.save();
      }

      return res.json(quizRepository);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Error creating/updating quiz repository." });
    }
  }
}

export default new QuizController();
