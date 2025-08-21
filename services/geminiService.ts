
import { GoogleGenAI, Type } from "@google/genai";
import type { Wod } from '../types';
import { translations, LanguageCode } from '../i18n';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const wodSchema = {
  type: Type.OBJECT,
  properties: {
    warmup: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        details: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    strength: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        details: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    metcon: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        details: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
  },
};

export async function generateWod(language: LanguageCode): Promise<Wod> {
  try {
    const languageName = translations[language].geminiLang;
    const prompt = `Generate a challenging and well-rounded CrossFit-style Workout of the Day (WOD) in ${languageName}. The WOD should be suitable for intermediate athletes but include scaling options for beginners. Structure it with a warm-up, a strength or skill component, and a metabolic conditioning (metcon) piece. Make the workout creative and effective.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: wodSchema,
      },
    });

    const jsonText = response.text.trim();
    const wodData = JSON.parse(jsonText);
    
    // Basic validation
    if (wodData.warmup && wodData.strength && wodData.metcon) {
        return wodData as Wod;
    } else {
        throw new Error("Invalid WOD structure received from API.");
    }

  } catch (error) {
    console.error("Error generating WOD:", error);
    throw new Error("Failed to generate a new workout. Please try again later.");
  }
}
