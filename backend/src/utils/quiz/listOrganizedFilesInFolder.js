const fs = require("fs").promises;
const path = require("path");

async function listOrganizedFilesInFolder(folderPath) {
  try {
    const fullFolderPath = path.resolve(__dirname, folderPath);
    const stats = await fs.stat(fullFolderPath);

    if (!stats.isDirectory()) {
      throw new Error("Not a directory!");
    }

    const files = await fs.readdir(fullFolderPath);

    const organizedFiles = files.reduce((result, file) => {
      const filePath = path.resolve(fullFolderPath, file);
      const fileName = path.basename(file);
      const fileExtension = path.extname(file);

      const match = fileName.match(/^(\w+)(\d+)\.(mp3|png)$/);

      if (match) {
        const [, fileType, fileNumber, fileFormat] = match;

        if (!result[fileNumber]) {
          result[fileNumber] = {};
        }

        result[fileNumber][`${fileType}.${fileFormat}`] = filePath;
      }

      return result;
    }, {});

    const filteredFiles = Object.entries(organizedFiles).reduce(
      (result, [key, value]) => {
        if (
          value["question.mp3"] &&
          value["questionWithAlternatives.png"] &&
          value["questionWithAnswer.png"]
        ) {
          result.push({
            "question.mp3": value["question.mp3"],
            "questionWithAlternatives.png": value["questionWithAlternatives.png"],
            "questionWithAnswer.png": value["questionWithAnswer.png"],
          });
        }
        return result;
      },
      []
    );

    return filteredFiles;
  } catch (error) {
    throw new Error(`Error listing files in folder: ${error.message}`);
  }
}

module.exports = listOrganizedFilesInFolder;