import { GoogleGenAI, Type } from "@google/genai";
import type { Wod, WodSection } from '../types';
import { translations, LanguageCode } from '../i18n';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const scalingOptionsSchema = {
    type: Type.OBJECT,
    properties: {
        beginner: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific, actionable scaling advice for beginners." },
        advanced: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific, actionable scaling advice for advanced athletes to increase difficulty." }
    }
};

const wodSectionSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        details: { type: Type.ARRAY, items: { type: Type.STRING } },
        duration: { type: Type.STRING, description: "Estimated time for the section, e.g., '15 minutes', 'AMRAP 20', 'For Time'" },
        scalingOptions: scalingOptionsSchema
    },
    required: ['title', 'details']
};

const wodSchema = {
  type: Type.OBJECT,
  properties: {
    goal: { type: Type.STRING, description: "A clear, concise goal for the entire workout. E.g., 'Metabolic Conditioning and Upper Body Strength'." },
    sections: {
      type: Type.ARRAY,
      items: wodSectionSchema
    }
  },
  required: ['goal', 'sections']
};

export async function generateWod(language: LanguageCode, wodType: 'individual' | 'team'): Promise<Wod> {
  try {
    const languageName = translations[language].geminiLang;
    
     let prompt = `Generate a challenging and well-rounded CrossFit-style Workout of the Day (WOD) in ${languageName}.
    The WOD must have a clear, overall 'goal' that describes its primary focus (e.g., 'Building raw strength and anaerobic capacity').
    
    The WOD should be structured into logical sections (like warmup, strength, metcon).
    For each section, provide:
    1. A 'title'.
    2. A list of 'details' outlining the exercises, reps, and sets.
    3. A suggested 'duration'.
    4. A 'scalingOptions' object containing two arrays of strings:
       - 'beginner': At least one clear, actionable way for a beginner to scale down the movements.
       - 'advanced': At least one clear, actionable way for an advanced athlete to scale up or increase the challenge.
    
    Make the workout creative and effective.`;
    
    if (wodType === 'team') {
        prompt += `\nThis workout MUST be designed for pairs (teams of 2). Adapt all components for a team format (e.g., one partner works while the other rests, synchronized movements, or splitting reps).`;
    } else {
        prompt += `\nThis workout is for an individual athlete.`;
    }


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
    
    // Basic validation for new structure
    if (wodData.goal && wodData.sections && Array.isArray(wodData.sections)) {
        return { ...wodData, type: wodType } as Wod;
    } else {
        throw new Error("Invalid WOD structure received from API.");
    }

  } catch (error) {
    console.error("Error generating WOD:", error);
    throw new Error("Failed to generate a new workout. Please try again later.");
  }
}


export async function regenerateWodSection(
  sectionIndex: number,
  currentWod: Wod,
  language: LanguageCode
): Promise<WodSection> {
  try {
    const languageName = translations[language].geminiLang;
    const prompt = `
      You are a CrossFit coach. A user wants to change one part of the following Workout of the Day (WOD).
      The current WOD is:
      ${JSON.stringify(currentWod, null, 2)}

      Your task is to generate a new, different, and creative section to replace the section at index ${sectionIndex} (which is "${currentWod.sections[sectionIndex]?.title}").
      The new section should be complementary to the other parts of the workout.
      Do not repeat exercises from the other sections.
      
      For the new section, you must provide:
      1. A 'title'.
      2. A list of 'details' outlining the exercises, reps, and sets.
      3. A suggested 'duration'.
      4. A 'scalingOptions' object with 'beginner' and 'advanced' scaling advice.

      Respond only with the JSON for the single new section. The response must be in ${languageName}.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: wodSectionSchema,
      },
    });

    const jsonText = response.text.trim();
    const sectionData = JSON.parse(jsonText);
    
    if (sectionData.title && sectionData.details) {
        return sectionData as WodSection;
    } else {
        throw new Error("Invalid Wod section structure received from API.");
    }

  } catch (error) {
    console.error(`Error regenerating section at index ${sectionIndex}:`, error);
    throw new Error("Failed to regenerate the workout section. Please try again.");
  }
}
