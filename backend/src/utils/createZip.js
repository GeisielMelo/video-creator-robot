const JSZip = require("jszip");
const fs = require("fs").promises;
const path = require("path");

async function listFilesInFolder(folderPath) {
  try {
    const fullFolderPath = path.resolve(__dirname, folderPath);
    const stats = await fs.stat(fullFolderPath);

    if (!stats.isDirectory()) {
      throw new Error("Not a directory!");
    }

    const files = await fs.readdir(fullFolderPath);
    return files.map((file) => path.resolve(fullFolderPath, file));
  } catch (error) {
    throw new Error(`Error listing files in folder: ${error.message}`);
  }
}

async function zipFiles(folderPath, zipName) {
  try {
    const fullFolderPath = path.resolve(__dirname, folderPath);
    const zip = new JSZip();
    const files = await listFilesInFolder(fullFolderPath);

    for (const file of files) {
      const fileContent = await fs.readFile(file);
      const fileName = path.relative(fullFolderPath, file);

      zip.file(fileName, fileContent);
    }

    const zipContent = await zip.generateAsync({ type: "nodebuffer" });
    const zipFilePath = path.resolve(fullFolderPath, `${zipName}.zip`);
    await fs.writeFile(zipFilePath, zipContent);

    console.log("Zip file created successfully!");
  } catch (error) {
    console.error(`Error creating zip file: ${error.message}`);
  }
}

module.exports = { zipFiles };
