const fs = require("fs");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const speechFilePath = "speech.wav";
const model = "playai-tts";
const voice = "Fritz-PlayAI";
// const text = "Hello team vasota warriors";
const text = fs.readFileSync('./public/text files/textSpeech.txt')
const responseFormat = "wav";


const textToSpeech = async () => {
  const response = await groq.audio.speech.create({
    model: model,
    voice: voice,
    input: text,
    response_format: responseFormat
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(speechFilePath, buffer);
}

const speechToText = async (filePath, prompt = "", language = "en") => {
  const translation = await groq.audio.translations.create({
    file: fs.createReadStream(filePath),
    model: "whisper-large-v3",
    prompt: prompt,
    language: language,
    response_format: "json",
    temperature: 0.0,
  });

  return translation.text; // return transcribed text
}



module.exports = { textToSpeech, speechToText };
