import { GoogleGenAI, Type } from "@google/genai";
import { ALL_APPS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function interpretIntent(query: string) {
  if (!query.trim()) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User intent: "${query}". 
      Available apps: ${ALL_APPS.map(a => a.name).join(", ")}.
      Based on the intent, suggest the most relevant apps from the list.
      Return a JSON object with:
      - suggestedApps: string[] (names of apps)
      - message: string (a short, helpful response like "Opening your workspace...")`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedApps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            message: { type: Type.STRING }
          },
          required: ["suggestedApps", "message"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error interpreting intent:", error);
    return {
      suggestedApps: [],
      message: "I'm having trouble understanding that right now."
    };
  }
}
