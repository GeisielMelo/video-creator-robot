const path = require("path");
const gm = require("gm").subClass({ imageMagick: "7+" });

const inputFile1 = path.resolve(__dirname, "fundo.png"); // Imagem de 1080x1920 com fundo transparente
const inputFile2 = path.resolve(__dirname, "imagemComTexto.png"); // Imagem com texto já escrito de 850x400
const outputFile = path.resolve(__dirname, "saida.png");

gm(inputFile1)
  .composite(inputFile2)
  .geometry(`+77+340`) // Centraliza com uma margem de 200px do topo
  .write(outputFile, function (err) {
    if (!err) console.log('done');
  });
