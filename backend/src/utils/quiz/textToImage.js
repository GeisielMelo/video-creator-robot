const path = require("path");
const gm = require("gm").subClass({ imageMagick: "7+" });
const wrap = require("word-wrap");
const fontFamily = path.resolve(__dirname, "../../fonts/Poppins-Bold.ttf");
const background = path.resolve(__dirname, "../../templates/background.png");
const question = path.resolve(__dirname, "tempQuestion.png");
const outputFile = path.resolve(__dirname, "question.png");

async function createTemporaryQuestion(text) {
  return new Promise((resolve, reject) => {
    console.log(text)
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
          console.log("Text to image: Error.");
        } else {
          console.log("Text to image: Done.");
          resolve();
        }
      });
  });
}

async function createQuestion() {
  return new Promise((resolve, reject) => {
    gm(background)
      .composite(question)
      .geometry(`+77+340`) // Centraliza com uma margem de 200px do topo
      .write(outputFile, function (err) {
        if (err) {
          reject(err);
          console.log("Question creation: Error.");
        } else {
          console.log("Question creation: Done.");
          resolve();
        }
      });
  });
}


//////////////////////////////////////////



async function minhaFuncao() {
  await createTemporaryQuestion("O problema parece estar relacionado ao cálculo de textWidth.");
  await createQuestion();
}

minhaFuncao();
