const fs = require("fs").promises;
const path = require("path");

function createFolder(folderPath) {
  let outputFolderPath = path.resolve(__dirname, folderPath);
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, { recursive: true });
  }
}

async function deletePNGFiles(folderPath) {
  try {
    const fullFolderPath = path.resolve(__dirname, folderPath);
    fs.readdirSync(fullFolderPath).forEach((file) => {
      const filePath = path.join(fullFolderPath, file);
      const fileExtension = path.extname(filePath);

      if (fileExtension === ".png") {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createFolder, deletePNGFiles };
