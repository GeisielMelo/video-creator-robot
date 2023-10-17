import { promisify } from "util";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

export const createCover = async (text) => {
  const inputImagePath = path.resolve(__dirname, "../templates/image.png");
  const outputFolderPath = path.resolve(__dirname, "../templates/output/");
  const outputImagePath = path.resolve(
    __dirname,
    "../templates/output/imageOut.png"
  );
  const fontFamily = path.resolve(__dirname, "../templates/Cascadia.ttf");

  const textLength = text.length;

  let fontSize;

  if (textLength <= 70) {
    fontSize = 82;
  } else if (textLength <= 100) {
    fontSize = 76;
  } else {
    fontSize = 66;
  }

  const xOffset = 55;
  const yOffset = 60;

  // Verify of output folder exists, if not, create it.
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, { recursive: true });
  }

  const command = `magick -size 1000x -pointsize ${fontSize} -fill black -gravity west caption:"${text}" "${inputImagePath}" +swap -geometry +${xOffset}+${yOffset} -composite "${outputImagePath}"`;

  try {
    await execAsync(command);
    console.log("Texto adicionado ao centro da imagem com sucesso.");
  } catch (error) {
    console.error("Ocorreu um erro ao adicionar texto à imagem:", error);
  }
};
