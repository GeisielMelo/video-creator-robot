const path = require("path");
const gm = require("gm").subClass({ imageMagick: "7+" });
const wrap = require("word-wrap");
const fs = require("fs").promises;
const dataQuestions = require("./data.json");

const fontFamily = path.resolve(__dirname, "../../fonts/Poppins-Bold.ttf");
const background = path.resolve(__dirname, "../../templates/background.png");
const question = path.resolve(__dirname, "tempQuestion.png");
const alternatives = path.resolve(__dirname, "tempAlternatives.png");
const answer = path.resolve(__dirname, "tempAnswer.png");
const tempBackground = path.resolve(__dirname, "tempBackground.png");

async function createTemporaryQuestion(text) {
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
      .write(question, function (err) {
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

async function createTemporaryAlternatives(list) {
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
      .write(alternatives, function (err) {
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

async function createTemporaryAnswer(list) {
  return new Promise((resolve, reject) => {
    const correctAnswer = list.find((item) => item.correct === true);
    const formattedList = `${correctAnswer.label.toUpperCase()}) ${
      correctAnswer.text
    }`;
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
      .write(answer, function (err) {
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

async function createQuestion() {
  return new Promise((resolve, reject) => {
    gm(background)
      .composite(question)
      .geometry(`+77+340`) // Centraliza com uma margem de 340px do topo
      .write(tempBackground, function (err) {
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

async function createAlternatives(index) {
  const questionWithAlternatives = path.resolve(
    __dirname,
    `questionWithAlternatives${index + 1}.png`
  );
  return new Promise((resolve, reject) => {
    gm(tempBackground)
      .composite(alternatives)
      .geometry(`+0+900`) // Centraliza com uma margem de 900px do topo
      .write(questionWithAlternatives, function (err) {
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

async function createAnswer(index) {
  const questionWithAnswer = path.resolve(
    __dirname,
    `questionWithAnswer${index + 1}.png`
  );
  return new Promise((resolve, reject) => {
    gm(tempBackground)
      .composite(answer)
      .geometry(`+0+900`) // Centraliza com uma margem de 200px do topo
      .write(questionWithAnswer, function (err) {
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

async function processQuestion(pergunta, questoes, index) {
  try {
    await createTemporaryQuestion(pergunta);
    await createQuestion();
    await createTemporaryAlternatives(questoes);
    await createAlternatives(index);
    await createTemporaryAnswer(questoes);
    await createAnswer(index);

    await fs.unlink(question);
    await fs.unlink(alternatives);
    await fs.unlink(answer);
    await fs.unlink(tempBackground);
    console.log("Temporary pngs deleted successfully.");
  } catch (error) {
    console.error("Error deleting temporary png:", error);
  }
}

async function processQuestions(index) {
  const element = dataQuestions[index];
  await processQuestion(element.question, element.options, index);
}

async function createQuiz() {
  for (let i = 0; i < dataQuestions.length; i++) {
    await processQuestions(i);
  }
}

createQuiz();