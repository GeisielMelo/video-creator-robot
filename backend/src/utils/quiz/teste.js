const concatenateImages = require("./concatenateImages");
const path = require("path");


const input = path.join(__dirname, "input.txt");

async function main(command) {
  try {
    await concatenateImages(command);
  } catch (error) {
    console.log(error);
  }
}


main(`ffmpeg -f concat -i ${input} -c copy bcde-afirmacoes_positivas.mp3`)
