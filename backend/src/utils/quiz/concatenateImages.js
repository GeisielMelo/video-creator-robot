const { exec } = require("child_process");

function concatenateImages(command) {
  return new Promise((resolve, reject) => {
    const process = exec(command);

    process.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    process.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    process.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Processo encerrado com código de saída ${code}`));
      }
    });
  });
}

module.exports = concatenateImages;
