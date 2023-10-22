const path = require("path");
const gm = require("gm").subClass({ imageMagick: "7+" });
const wrap = require("word-wrap");
const fs = require("fs").promises;
const { createFolder } = require("../folders");
const fontFamily = path.resolve(__dirname, "../../fonts/Poppins-Bold.ttf");

//
async function createTemporaryQuestion(text, userId) {
  const outputFile = path.resolve(__dirname, `../../downloads/${userId}/tempQuestion.png`);
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
      .font(fontFamily) // Font family
      .drawText(0, 0, formattedText) // Generate the text.
      .write(outputFile, function (err) {
        if (err) {
          reject(err);
          console.log("Temporary text question: Error.");
        } else {
          console.log("Temporary text question: Done.");
          resolve();
        }
      });
  });
}
//
async function createTemporaryAlternatives(list, userId) {
  const outputFile = path.resolve(__dirname, `../../downloads/${userId}/tempAlternatives.png`);
  return new Promise((resolve, reject) => {
    const formattedList = `A)${list[0].text} \nB)${list[1].text} \nC)${list[2].text} \nD)${list[3].text} `;
    const textFontSize = 88; // Define fontSize based on textLength.
    const WIDTH = 1080; // Width of the image in pixels.
    const HEIGHT = 500; // Height of the image in pixels.

    gm(WIDTH, HEIGHT, "rgba(255, 255, 255, 0)") // Create a transparent text box.
      .gravity("Center") // Box align center.
      .fill("#ffffff") // Text color.
      .stroke("#000000") // Border color
      .strokeWidth(4) // Border width.
      .fontSize(textFontSize) // Font size.
      .font(fontFamily) // Font family
      .drawText(0, 0, formattedList) // Generate the text.
      .write(outputFile, function (err) {
        if (err) {
          reject(err);
          console.log("Temporary text alternative: Error.");
        } else {
          console.log("Temporary text alternative: Done.");
          resolve();
        }
      });
  });
}
//
async function createTemporaryAnswer(list, userId) {
  const outputFile = path.resolve(__dirname, `../../downloads/${userId}/tempAnswer.png`);
  return new Promise((resolve, reject) => {
    const correctAnswer = list.find((item) => item.correct === true);
    const formattedList = `${correctAnswer.label.toUpperCase()}) ${correctAnswer.text}`;
    const textFontSize = 88; // Define fontSize based on textLength.
    const WIDTH = 1080; // Width of the image in pixels.
    const HEIGHT = 500; // Height of the image in pixels.

    gm(WIDTH, HEIGHT, "rgba(255, 255, 255, 0)") // Create a transparent text box.
      .gravity("Center") // Box align center.
      .fill("#ffffff") // Text color.
      .stroke("#000000") // Border color
      .strokeWidth(4) // Border width.
      .fontSize(textFontSize) // Font size.
      .font(fontFamily) // Font family
      .drawText(0, 0, formattedList) // Generate the text.
      .write(outputFile, function (err) {
        if (err) {
          reject(err);
          console.log("Temporary text answer: Error.");
        } else {
          console.log("Temporary text answer: Done.");
          resolve();
        }
      });
  });
}
//
async function createQuestion(userId) {
  const inputBackgroundFile = path.resolve(__dirname, "../../templates/background.png");
  const inputQuestionFile = path.resolve(__dirname, `../../downloads/${userId}/tempQuestion.png`);
  const outputFile = path.resolve(__dirname, `../../downloads/${userId}/tempBackground.png`);
  return new Promise((resolve, reject) => {
    gm(inputBackgroundFile)
      .composite(inputQuestionFile)
      .geometry(`+77+340`) // Centraliza com uma margem de 340px do topo
      .write(outputFile, function (err) {
        if (err) {
          reject(err);
          console.log("Temporary background creation: Error.");
        } else {
          console.log("Temporary background creation: Done.");
          resolve();
        }
      });
  });
}
//
async function createAlternatives(index, userId) {
  const outputFile = path.resolve(__dirname, `../../downloads/${userId}/questionWithAlternatives${index + 1}.png`);
  const inputBackgroundFile = path.resolve(__dirname, `../../downloads/${userId}/tempBackground.png`);
  const inputFile = path.resolve(__dirname, `../../downloads/${userId}/tempAlternatives.png`);
  return new Promise((resolve, reject) => {
    gm(inputBackgroundFile)
      .composite(inputFile)
      .geometry(`+0+900`) // Centraliza com uma margem de 900px do topo
      .write(outputFile, function (err) {
        if (err) {
          reject(err);
          console.log("Creating question with alternatives: Error.");
        } else {
          console.log("Creating question with alternatives: Done.");
          resolve();
        }
      });
  });
}

async function createAnswer(index, userId) {
  const inputFile = path.resolve(__dirname, `../../downloads/${userId}/tempAnswer.png`);
  const outputFile = path.resolve(__dirname, `../../downloads/${userId}/questionWithAnswer${index + 1}.png`);
  const inputBackgroundFile = path.resolve(__dirname, `../../downloads/${userId}/tempBackground.png`);
  return new Promise((resolve, reject) => {
    gm(inputBackgroundFile)
      .composite(inputFile)
      .geometry(`+0+900`) // Centraliza com uma margem de 200px do topo
      .write(outputFile, function (err) {
        if (err) {
          reject(err);
          console.log("Creating question with answer: Error.");
        } else {
          console.log("Creating question with answer: Done.");
          resolve();
        }
      });
  });
}

// Process a single quest
async function processQuestion(question, options, index, userId) {
  try {
    // Create quiz components
    await createTemporaryQuestion(question, userId);
    await createQuestion(userId);
    await createTemporaryAlternatives(options, userId);
    await createAlternatives(index, userId);
    await createTemporaryAnswer(options, userId);
    await createAnswer(index, userId);

    // Delete temporary question.
    await fs.unlink(path.resolve(__dirname, `../../downloads/${userId}/tempQuestion.png`));
    // Delete temporary alternatives.
    await fs.unlink(path.resolve(__dirname, `../../downloads/${userId}/tempAlternatives.png`));
    // Delete temporary answer.
    await fs.unlink(path.resolve(__dirname, `../../downloads/${userId}/tempAnswer.png`));
    // Delete temporary background.
    await fs.unlink(path.resolve(__dirname, `../../downloads/${userId}/tempBackground.png`));

    console.log("Temporary pngs deleted successfully.");
  } catch (error) {
    console.error("Error deleting temporary png:", error);
  }
}

// Create a queue to process the questions.
async function processQuestions(index, jsonArray, userId) {
  const element = jsonArray[index];
  await processQuestion(element.question, element.options, index, userId);
}

// Create a quiz
async function createQuizImages(jsonArray, userId) {
  createFolder(`../downloads/${userId}`);

  for (let i = 0; i < jsonArray.length; i++) {
    await processQuestions(i, jsonArray, userId);
  }
}

module.exports = { createQuizImages };
