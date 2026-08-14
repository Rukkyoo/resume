import fs from 'fs';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GOOGLE_GENERATIVE_AI_API_KEY=["']?([^"'\s\r\n]+)/);
const key = keyMatch ? keyMatch[1] : '';

const google = createGoogleGenerativeAI({ apiKey: key });

async function test(modelName) {
  try {
    const res = await generateText({
      model: google(modelName),
      prompt: "Respond with exact text: OK_WORKING",
    });
    console.log(`[${modelName}] -> SUCCESS:`, res.text.trim());
  } catch (err) {
    console.error(`[${modelName}] -> ERROR:`, err.message);
  }
}

async function run() {
  await test("gemini-2.5-flash");
  await test("gemini-flash-latest");
  await test("gemini-2.5-flash-lite");
}

run();
