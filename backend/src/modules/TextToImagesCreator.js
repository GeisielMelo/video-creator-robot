const path = require("path");
const gm = require("gm").subClass({ imageMagick: "7+" });
const wrap = require("word-wrap");
const fs = require("fs").promises;

class TextToImagesCreator {
  constructor(jsonArray, userId) {
    this.jsonArray = jsonArray;
    this.userId = userId;
    this.fontFamily = path.resolve(__dirname, "../fonts/Poppins-Bold.ttf");
    this.tempQuestion = path.resolve(__dirname, `../archives/${userId}/processing/tempQuestion.png`);
    this.tempAlternatives = path.resolve(__dirname, `../archives/${userId}/processing/tempAlternatives.png`);
    this.tempAnswer = path.resolve(__dirname, `../archives/${userId}/processing/tempAnswer.png`);
    this.tempBackground = path.resolve(__dirname, `../archives/${userId}/processing/tempBackground.png`);
    this.background = path.resolve(__dirname, "../templates/background.png");
  }

  async _createTemporaryQuestion(text) {
    return new Promise((resolve, reject) => {
      const formattedText = wrap(text, {
        width: text.length > 85 ? 30 : 25,
        cut: false,
      }); // Using word-wrap to make the breaking points.
      const textFontSize = text.length > 85 ? 48 : 58; // Define fontSize based on textLength.
      const WIDTH = 925; // Width of the image in pixels.
      const HEIGHT = 285; // Height of the image in pixels.

      gm(WIDTH, HEIGHT, "rgba(255, 255, 255, 0)") // Create a transparent text box.
        .gravity("Center") // Box align center.
        .fill("#ffffff") // Text color.
        .stroke("#000000") // Border color
        .strokeWidth(3) // Border width.
        .fontSize(textFontSize) // Font size.
        .font(this.fontFamily) // Font family
        .drawText(0, 0, formattedText) // Generate the text.
        .write(this.tempQuestion, function (err) {
          if (err) {
            reject(err);
            throw new Error(`Temporary text question: ${err}`);
          } else {
            resolve();
          }
        });
    });
  }

  async _createTemporaryAlternatives(list) {
    return new Promise((resolve, reject) => {
      const formattedList = `A)${list[0].text} \nB)${list[1].text} \nC)${list[2].text} \nD)${list[3].text} `;

      const textFontSize =
        Math.max(
          list[0]?.text.length || 0,
          list[1]?.text.length || 0,
          list[2]?.text.length || 0,
          list[3]?.text.length || 0
        ) > 20
          ? 58
          : 72; // Define fontSize based on textLength.

      const WIDTH = 1080; // Width of the image in pixels.
      const HEIGHT = 500; // Height of the image in pixels.

      gm(WIDTH, HEIGHT, "rgba(255, 255, 255, 0)") // Create a transparent text box.
        .gravity("Center") // Box align center.
        .fill("#ffffff") // Text color.
        .stroke("#000000") // Border color
        .strokeWidth(4) // Border width.
        .fontSize(textFontSize) // Font size.
        .font(this.fontFamily) // Font family
        .drawText(0, 0, formattedList) // Generate the text.
        .write(this.tempAlternatives, function (err) {
          if (err) {
            reject(err);
            throw new Error(`Temporary text alternative: ${err}`);
          } else {
            resolve();
          }
        });
    });
  }

  async _createTemporaryAnswer(list) {
    return new Promise((resolve, reject) => {
      const correctAnswer = list.find((item) => item.correct === true);
      const formattedAnswer = `${correctAnswer.label.toUpperCase()}) ${correctAnswer.text}`;
      const textFontSize = formattedAnswer.length > 20 ? 58 : 72; // Define fontSize based on textLength.
      const WIDTH = 1080; // Width of the image in pixels.
      const HEIGHT = 500; // Height of the image in pixels.

      gm(WIDTH, HEIGHT, "rgba(255, 255, 255, 0)") // Create a transparent text box.
        .gravity("Center") // Box align center.
        .fill("#34EE4E") // Text color.
        .stroke("#000000") // Border color
        .strokeWidth(4) // Border width.
        .fontSize(textFontSize) // Font size.
        .font(this.fontFamily) // Font family
        .drawText(0, 0, formattedAnswer) // Generate the text.
        .write(this.tempAnswer, function (err) {
          if (err) {
            reject(err);
            throw new Error(`Temporary text answer: ${err}`);
          } else {
            resolve();
          }
        });
    });
  }

  async _createQuestion() {
    return new Promise((resolve, reject) => {
      gm(this.background)
        .composite(this.tempQuestion)
        .geometry(`+77+340`) // Centraliza com uma margem de 340px do topo
        .write(this.tempBackground, function (err) {
          if (err) {
            reject(err);
            throw new Error(`Temporary background creation: ${err}`);
          } else {
            resolve();
          }
        });
    });
  }

  async _createAlternatives(index) {
    const outputFile = path.resolve(
      __dirname,
      `../archives/${this.userId}/processing/questionWithAlternatives${index + 1}.png`
    );
    return new Promise((resolve, reject) => {
      gm(this.tempBackground)
        .composite(this.tempAlternatives)
        .geometry(`+0+900`) // Centraliza com uma margem de 900px do topo
        .write(outputFile, function (err) {
          if (err) {
            reject(err);
            throw new Error(`Creating question with alternatives: ${err}`);
          } else {
            resolve();
          }
        });
    });
  }

  async _createAnswer(index) {
    const outputFile = path.resolve(
      __dirname,
      `../archives/${this.userId}/processing/questionWithAnswer${index + 1}.png`
    );
    return new Promise((resolve, reject) => {
      gm(this.tempBackground)
        .composite(this.tempAnswer)
        .geometry(`+0+900`) // Centraliza com uma margem de 200px do topo
        .write(outputFile, function (err) {
          if (err) {
            reject(err);
            throw new Error(`Creating question with answer: ${err}`);
          } else {
            resolve();
          }
        });
    });
  }

  async _processQuestion(question, options, index) {
    try {
      // Create quiz components
      await this._createTemporaryQuestion(question);
      await this._createQuestion();
      await this._createTemporaryAlternatives(options);
      await this._createAlternatives(index);
      await this._createTemporaryAnswer(options);
      await this._createAnswer(index);
    } catch (error) {
      throw new Error(`Error on process question`);
    }
  }

  async _processQuestions(index) {
    const element = this.jsonArray[index];
    await this._processQuestion(element.question, element.options, index);
  }

  async _deleteTempFiles() {
    try {
      await fs.unlink(this.tempQuestion);
      await fs.unlink(this.tempAlternatives);
      await fs.unlink(this.tempAnswer);
      await fs.unlink(this.tempBackground);
    } catch (error) {
      throw new Error(`Error on deleting temporary files.`);
    }
  }

  async render() {
    console.log(`Crating temp images for user:${this.userId}`);
    try {
      for (let i = 0; i < this.jsonArray.length; i++) {
        await this._processQuestions(i, this.jsonArray);
      }
      await this._deleteTempFiles();
    } catch (error) {
      throw new Error(`Error on creating quiz images.`);
    }
    console.log(`Successfully created images for user:${this.userId}`);
  }
}

module.exports = TextToImagesCreator;
