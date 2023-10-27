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

async function deleteUserFiles(userId) {
  try {
    const userFolder = path.resolve(__dirname, `../downloads/${userId}`);
    const files = await fs.promises.readdir(userFolder);

    for (const file of files) {
      const filePath = path.join(userFolder, file);

      if (filePath.includes("png")) {
        await fs.promises.unlink(filePath);
      }

      if (filePath.includes("mp4")) {
        await fs.promises.unlink(filePath);
      }

      if (filePath.includes("mp3")) {
        await fs.promises.unlink(filePath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { createFolder, fetchSolicitations, deleteUserFiles };
