const axios = require("axios");
const fs = require("fs");
const path = require("path");

class TextToSpeechCreator {
  constructor(jsonArray, userId) {
    this.jsonArray = jsonArray;
    this.userId = userId;
  }

  async _elevenLabsAudioGenerator(text, outputName) {
    const url = "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB";

    const headers = {
      Accept: "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": "6b01a4f03be91c802fc31a80856a75c2",
    };

    const data = {
      text: text,
      model_id: "eleven_multilingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(url, data, {
          headers,
          responseType: "stream",
        });

        const outputAudio = path.resolve(__dirname, `../archives/${this.userId}/processing/${outputName}.mp3`);
        const writer = fs.createWriteStream(outputAudio);

        response.data.on("data", (chunk) => {
          writer.write(chunk, "binary");
        });

        response.data.on("end", () => {
          writer.end();
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async CreateAudiosWithElevenLabs() {
    console.log(`Creating ElevenLabs audios for user:${this.userId}`);
    try {
      for (let [index, element] of this.jsonArray.entries()) {
        await this._elevenLabsAudioGenerator(element.question, `question${index + 1}`);
      }
    } catch (error) {
      console.error(`Error on generate audios with elevenLabs.`);
    }
    console.log(`Successfully ElevenLabs audios for user:${this.userId}`);
  }
}

module.exports = TextToSpeechCreator;
