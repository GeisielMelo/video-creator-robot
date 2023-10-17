const path = require("path");
const gm = require("gm").subClass({ imageMagick: "7+" });
const wrap = require('word-wrap');

// const inputFile = path.resolve(__dirname, "../templates/image.png");
const outputFile = path.resolve(__dirname, "imagemComTexto.png");
const fontFamily = path.resolve(__dirname, "../fonts/Poppins-Regular.ttf");

const text = wrap('Sansão usou a mandíbula de um jumento para eliminar quantos homens?', { width: 30, cut: false });
const textFontSize = 48;
const color = "#2596be";
const WIDTH = 925;  // Largura da região
const HEIGHT = 285; // Altura da região

// Calcula a largura do texto
const textWidth = gm().fontSize(textFontSize).font(fontFamily).drawText(0, 0, text, 'Width').size().width;

// Calcula a posição X para centralizar o texto
const X = (WIDTH - textWidth) / 2;

gm(WIDTH, HEIGHT, "#ffffff") // Cria uma nova imagem branca
  .gravity('Center') // Alinha o texto ao centro
  .fill(color) // Define a cor do texto
  .fontSize(textFontSize) // Define o tamanho da fonte
  .font(fontFamily) // Define a fonte
  .drawText(X, 0, text) // Adiciona o texto
  .write(outputFile, function (err) {
    if (!err) console.log('done');
  });
