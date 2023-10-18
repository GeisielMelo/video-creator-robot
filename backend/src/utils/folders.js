const fs = require("fs");
const path = require("path");

function createFolder(folderPath) {
  let outputFolderPath = path.resolve(__dirname, folderPath);
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, { recursive: true });
  }
}

module.exports = { createFolder };
