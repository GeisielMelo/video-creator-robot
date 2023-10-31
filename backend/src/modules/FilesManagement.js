const path = require("path");
const fs = require("fs");

class FilesManagement {
  constructor(userId) {
    this.userId = userId;
    this.userPath = path.join(__dirname, `../archives/${userId}`);
    this.userProcessingPath = path.join(__dirname, `../archives/${userId}/processing`);
    this.userOutputPath = path.join(__dirname, `../archives/${userId}/output`);
  }

  async _createFolder(folder) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
  }

  async createUserFolders() {
    try {
      await this._createFolder(this.userPath);
      await this._createFolder(this.userProcessingPath);
      await this._createFolder(this.userOutputPath);
    } catch (error) {
      throw new Error(`Fail on folders creation: ${error.message}`);
    }
  }
  
  async clearProcessingFolder() {
    try {
      const files = await fs.promises.readdir(this.userProcessingPath);

      for (const file of files) {
        const filePath = path.join(this.userProcessingPath, file);

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
    } catch (error) {
      throw new Error(`Fail on folders creation: ${error.message}`);
    }
  }
}

module.exports = FilesManagement;
