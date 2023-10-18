const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");

function zipFiles() {
  const zip = new JSZip();
  const arquivo = path.resolve(__dirname, "arquivo.txt");

  // Lê o conteúdo do arquivo
  const conteudoArquivo = fs.readFileSync(arquivo);

  // Adiciona o arquivo ao zip
  zip.file("arquivo.txt", conteudoArquivo);

  // Gera o arquivo zip
  zip.generateAsync({ type: "nodebuffer" }).then((conteudoZip) => {
    const caminhoDoArquivoZip = path.resolve(__dirname, "arquivo.zip");
    fs.writeFileSync(caminhoDoArquivoZip, conteudoZip);
    console.log("Arquivo zip criado com sucesso!");
  }).catch((erro) => {
    console.error("Erro ao criar o arquivo zip:", erro);
  });
}



zipFiles();
