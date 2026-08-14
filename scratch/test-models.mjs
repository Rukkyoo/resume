import fs from 'fs';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GOOGLE_GENERATIVE_AI_API_KEY=["']?([^"'\s\r\n]+)/);
const key = keyMatch ? keyMatch[1] : '';

console.log("Using key prefix:", key.slice(0, 12));

const google = createGoogleGenerativeAI({ apiKey: key });

async function testModel(modelName) {
  try {
    const res = await generateText({
      model: google(modelName),
      prompt: "Hello! Respond with OK.",
    });
    console.log(`Model [${modelName}] -> SUCCESS:`, res.text.trim());
  } catch (err) {
    console.error(`Model [${modelName}] -> ERROR:`, err.message);
  }
}

async function run() {
  await testModel("gemini-2.0-flash");
  await testModel("gemini-1.5-flash");
  await testModel("gemini-1.5-pro");
  await testModel("gemini-3.5-flash");
}

run();
