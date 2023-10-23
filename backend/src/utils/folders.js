const fs = require("fs");
const path = require("path");

async function fetchAudioQuestionsPath(userId) {
  try {
    const questionsArray = [];
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
    throw error;
  }
}

module.exports = { fetchAudioQuestionsPath };
