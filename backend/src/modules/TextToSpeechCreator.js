const axios = require("axios");
const fs = require("fs");
const path = require("path");

class TextToSpeechCreator {
  constructor(jsonArray, userId) {
    this.jsonArray = jsonArray;
    this.userId = userId;
  }

  async _elevenLabsAudioGenerator(text, outputName) {
    return new Promise((resolve, reject) => {
      const url = "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB";

      const headers = {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": "YOUR ELEVENLABS API KEY HERE!",
      };

      const data = {
        text: text,
        model_id: "eleven_multilingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      };

      axios
        .post(url, data, { headers, responseType: "stream" })
        .then((response) => {
          const outputAudio = path.resolve(__dirname, `../archives/${this.userId}/processing/${outputName}.mp3`);
          const writer = fs.createWriteStream(outputAudio);

          response.data.on("data", (chunk) => {
            writer.write(chunk, "binary");
          });

          response.data.on("end", () => {
            writer.end();
            resolve(outputAudio); // Resolve with the path to the saved audio file
          });

          response.data.on("error", (error) => {
            console.error("Error in response stream:", error);
            writer.end();
            reject(error); // Reject with the error if there is one
          });
        })
        .catch((error) => {
          console.error("Error in axios request:", error);
          reject(error); // Reject with the error if there is one
        });
    });
  }

  async CreateAudiosWithElevenLabs() {
    console.log(`Creating ElevenLabs audios for user:${this.userId}`);
    try {
      for (let [index, element] of this.jsonArray.entries()) {
        await this._elevenLabsAudioGenerator(element.question, `question${index + 1}`);
      }

      console.log(`Successfully ElevenLabs audios for user:${this.userId}`);
    } catch (error) {
      console.error(`Error on generate audios with elevenLabs.`, error);
    }
  }
}

module.exports = TextToSpeechCreator;
