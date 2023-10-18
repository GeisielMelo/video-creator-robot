const fs = require('fs');
const path = require('path');

function lerArquivosNaPasta(caminhoDaPasta) {
  // Lê o conteúdo do diretório
  fs.readdir(caminhoDaPasta, (erro, arquivos) => {
    if (erro) {
      console.error('Erro ao ler a pasta:', erro);
      return;
    }

    // Itera sobre os arquivos
    arquivos.forEach((arquivo) => {
      // Obtém o caminho completo do arquivo
      const caminhoCompleto = path.join(caminhoDaPasta, arquivo);

      // Verifica se é um arquivo ou diretório
      fs.stat(caminhoCompleto, (erro, estatisticas) => {
        if (erro) {
          console.error('Erro ao obter estatísticas do arquivo:', erro);
          return;
        }

        if (estatisticas.isFile()) {
          console.log('Arquivo:', caminhoCompleto);
          // Aqui você pode fazer o que quiser com o arquivo
        } else if (estatisticas.isDirectory()) {
          console.log('Diretório:', caminhoCompleto);
          // Se for um diretório, você pode chamar a função novamente para ler os arquivos dentro dele
          lerArquivosNaPasta(caminhoCompleto);
        }
      });
    });
  });
}

// Chamando a função e passando o caminho da pasta como argumento
lerArquivosNaPasta(__dirname);
