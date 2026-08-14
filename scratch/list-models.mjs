import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const keyMatch = env.match(/GOOGLE_GENERATIVE_AI_API_KEY=["']?([^"'\s\r\n]+)/);
const key = keyMatch ? keyMatch[1] : '';

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    if (data.models) {
      console.log("AVAILABLE MODELS:", data.models.map(m => m.name));
    } else {
      console.log("RESPONSE:", JSON.stringify(data));
    }
  } catch (err) {
    console.error("ERROR:", err);
  }
}

listModels();
