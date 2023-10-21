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


main(`ffmpeg -f concat -safe 0 -i ${input} -c copy output.wav`)
//https://trac.ffmpeg.org/wiki/Concatenate