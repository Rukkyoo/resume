import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const googleProvider = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export interface AIRecommendation {
  id: string;
  category: string;
  text: string;
  type: 'strength' | 'improvement' | 'keyword';
}

export interface AIAnalysisResult {
  score: number;
  analysis: string;
  recommendations: AIRecommendation[];
  isVerified: boolean;
}

export async function analyzeCVAndJob(
  cvText: string,
  jobDescription: string,
  isUserLoggedIn: boolean
): Promise<AIAnalysisResult> {
  const systemPrompt = `You are an expert ATS & CV reviewer and career advisor.
Analyze the provided candidate CV text against the target job description.

Candidate CV Text:
${cvText || 'No CV text provided.'}

Target Job Description:
${jobDescription || 'No job description provided.'}

Respond in strictly valid JSON format with this structure:
{
  "score": <number 50-98 for ATS match percentage>,
  "analysis": "<Comprehensive analysis in markdown format with headings: ## Overall Alignment, ## Strengths, ## Areas for Improvement, ## Tailored Bullet Point Suggestions>",
  "recommendations": [
    {
      "id": "1",
      "category": "<Category name e.g. Keywords, Quantifiable Metrics, Technical Skills, Layout>",
      "text": "<Concise, actionable advice>",
      "type": "<one of 'strength', 'improvement', or 'keyword'>"
    }
  ]
}
Do not add markdown code blocks like \`\`\`json. Return pure JSON text.`;

  let responseText = "";

  try {
    const result = await generateText({
      model: googleProvider("gemini-3.5-flash"),
      prompt: systemPrompt,
    });
    responseText = result.text;
  } catch (err: any) {
    console.warn('[lib/chat] gemini-3.5-flash failed:', err?.message || err);
    try {
      const result = await generateText({
        model: googleProvider("gemini-flash-latest"),
        prompt: systemPrompt,
      });
      responseText = result.text;
    } catch (fallbackErr: any) {
      console.error('[lib/chat] All Gemini AI models failed:', fallbackErr?.message || fallbackErr);
      throw new Error(`Failed to generate AI analysis: ${fallbackErr?.message || 'API error'}`);
    }
  }

  let jsonResult: { score?: number; analysis?: string; recommendations?: AIRecommendation[] } = {};
  try {
    const cleanedText = responseText.replace(/```json\s*|\s*```/g, '').trim();
    jsonResult = JSON.parse(cleanedText);
  } catch (parseError) {
    console.warn('[lib/chat] Could not parse JSON directly from AI text, using fallback structure:', parseError);
    jsonResult = {
      score: 85,
      analysis: responseText,
      recommendations: [
        {
          id: "1",
          category: "ATS Optimization",
          text: "Align resume key terminology directly with terms found in the job description.",
          type: "keyword",
        },
        {
          id: "2",
          category: "Impact",
          text: "Quantify past achievements using percentages and numerical metrics.",
          type: "improvement",
        },
      ],
    };
  }

  const score = jsonResult.score || 85;
  const analysis = jsonResult.analysis || responseText || "Analysis complete.";
  const recommendations = (jsonResult.recommendations || []).map((rec, index) => ({
    id: rec.id || String(index + 1),
    category: rec.category || "General",
    text: rec.text || "",
    type: (['strength', 'improvement', 'keyword'].includes(rec.type) ? rec.type : 'improvement') as 'strength' | 'improvement' | 'keyword',
  }));


  if (isUserLoggedIn) {
    return {
      score,
      analysis,
      recommendations,
      isVerified: true,
    };
  } else {
    // Unverified user: return snippet only (1 recommendation, preview analysis)
    return {
      score,
      analysis: analysis.length > 220 ? analysis.slice(0, 220) + "..." : analysis,
      recommendations: recommendations.slice(0, 1),
      isVerified: false,
    };
  }
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const body = await req.json();
    const cvText = body.cvData?.content || body.cvText || "";
    const jobDescription = body.jobData?.description || body.jobDescription || "";
    const isUserLoggedIn = body.isUserLoggedIn ?? false;

    const data = await analyzeCVAndJob(cvText, jobDescription, isUserLoggedIn);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("[lib/chat] Edge handler error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}