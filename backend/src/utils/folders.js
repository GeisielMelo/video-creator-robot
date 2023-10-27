const path = require("path");
const fs = require("fs");

async function createFolder(folderPath) {
  const folder = path.join(__dirname, folderPath);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
}

async function fetchSolicitations(userId) {
  const checkString = (string) => {
    return /^\d{11}$/.test(string);
  };

  try {
    await createFolder(`../downloads/${userId}`);
    const solicitations = [];
    const files = await fs.promises.readdir(path.resolve(__dirname, `../downloads/${userId}`));

    for (const file of files) {
      if (checkString(file)) {
        let subFolder = await fs.promises.readdir(path.resolve(__dirname, `../downloads/${userId}/${file}`));
        solicitations.push({ folder: file, archive: subFolder });
      }
    }

    return solicitations;
  } catch (error) {
    console.error(error);
  }
}

async function deleteFiles(directoryPath, extension) {
  try {
    const files = await fs.promises.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.promises.stat(filePath);

      if (stats.isFile() && path.extname(file) === extension) {
        await fs.promises.unlink(filePath);
        console.log(`Deleted: ${filePath}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { createFolder, fetchSolicitations, deleteFiles };
