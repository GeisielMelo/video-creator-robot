const fs = require("fs");
const path = require("path");

async function fetchAudioQuestionsPath(userId) {
  try {
    let questionsArray = [];
    const files = await fs.promises.readdir(path.resolve(__dirname, `../downloads/${userId}`));

    files.forEach((file) => {
      const filePath = path.join(path.resolve(__dirname, `../downloads/${userId}`), file);
      const fileExtension = path.extname(filePath);

      if (fileExtension === ".mp3") {
        questionsArray.push(filePath);
      }
    });
    return questionsArray;
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuestionsWithAlternatives(userId) {
  try {
    let questionsArray = [];
    const files = await fs.promises.readdir(path.resolve(__dirname, `../downloads/${userId}`));

    files.forEach((file) => {
      const filePath = path.join(path.resolve(__dirname, `../downloads/${userId}`), file);
      const fileExtension = path.extname(filePath);

      if (fileExtension === ".png") {
        if (file.includes("questionWithAlternatives")) {
          questionsArray.push(filePath);
        }
      }
    });
    return questionsArray;
  } catch (error) {
    console.error(error);
  }
}

async function fetchQuestionsWithAnswers(userId) {
  try {
    let questionsArray = [];
    const files = await fs.promises.readdir(path.resolve(__dirname, `../downloads/${userId}`));

    files.forEach((file) => {
      const filePath = path.join(path.resolve(__dirname, `../downloads/${userId}`), file);
      const fileExtension = path.extname(filePath);

      if (fileExtension === ".png") {
        if (file.includes("questionWithAnswer")) {
          questionsArray.push(filePath);
        }
      }
    });
    return questionsArray;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { fetchAudioQuestionsPath, fetchQuestionsWithAlternatives, fetchQuestionsWithAnswers };
