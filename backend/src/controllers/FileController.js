import path from 'path';

class FileController {
  async downloadImage(req, res) {
    try {
      const imagePath = path.join(__dirname, '../img/image.png');
      res.sendFile(imagePath, { headers: { 'Content-Type': 'image/png' } });
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao enviar a imagem.' });
    }
  }
}

export default new FileController();
