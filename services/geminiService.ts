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
    },
    type: { type: Type.STRING, description: "The type of workout. Must be 'individual' or 'team'." }
  },
  required: ['goal', 'sections', 'type']
};

export async function generateWod(language: LanguageCode, wodType: 'individual' | 'team' | 'competition'): Promise<Wod> {
  try {
    const languageName = translations[language].geminiLang;
    
     let prompt = `Generate a challenging and well-rounded CrossFit-style Workout of the Day (WOD) in ${languageName}.
    The WOD must have a clear, overall 'goal' that describes its primary focus (e.g., 'Building raw strength and anaerobic capacity').
    
    The WOD should be structured into logical sections (like warmup, strength, main conditioning piece). For the main conditioning section, avoid simply calling it 'Metcon'. Use a more descriptive or creative title like 'Engine Builder', 'The Grinder', 'For Time:', or a name that reflects the workout's character.
    
    For each section, provide:
    1. A 'title'.
    2. A list of 'details' outlining the exercises, reps, and sets. For any strength or weightlifting movements (e.g., squats, deadlifts, overhead press, snatch, clean and jerk), you MUST specify the working weight as a percentage of the athlete's 1-repetition max (1RM). For example: "Back Squat: 5 sets of 3 reps @ 85% 1RM". For all other specified weights (e.g., dumbbells, kettlebells), you MUST specify weights for both male (RX M) and female (RX F) athletes in kilograms (kg). For example: "Kettlebell Swings (RX M: 24kg, RX F: 16kg)".
    3. A suggested 'duration'.
    4. A 'scalingOptions' object containing two arrays of strings:
       - 'beginner': At least one clear, actionable way for a beginner to scale down the movements.
       - 'advanced': At least one clear, actionable way for an advanced athlete to scale up or increase the challenge.
    
    Make the workout creative and effective.`;
    
    if (wodType === 'team') {
        prompt += `\nThis workout MUST be designed for pairs (teams of 2). Adapt all components for a team format (e.g., one partner works while the other rests, synchronized movements, or splitting reps).`;
    } else if (wodType === 'competition') {
        prompt += `\nThis workout MUST be designed as a challenging CrossFit competition event for an individual athlete. It should test a broad range of skills and fitness domains. Consider using higher-skill gymnastics (like muscle-ups, handstand walks), heavier weights for barbell movements, and complex structures like chippers, ladders, or multiple scored parts with strict time caps. The goal should reflect a high-level competitive test.`;
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
      2. A list of 'details' outlining the exercises, reps, and sets. IMPORTANT: If the new section includes strength or weightlifting movements, you MUST specify the working weight as a percentage of the athlete's 1-repetition max (1RM). For example: "5 sets of 3 reps @ 85% 1RM". For all other specified weights (e.g., for dumbbells or kettlebells), you MUST specify weights for both male (RX M) and female (RX F) athletes in kilograms (kg). For example: "Kettlebell Swings (RX M: 24kg, RX F: 16kg)".
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

const fullWeekSchema = {
    type: Type.ARRAY,
    items: wodSchema
};

export async function generateFullWeekWod(language: LanguageCode): Promise<Wod[]> {
  try {
    const languageName = translations[language].geminiLang;
    const prompt = `
      Generate a comprehensive and balanced 7-day CrossFit workout plan in ${languageName}.
      The response must be a JSON array containing exactly 7 WOD objects, one for each day of the week, starting with Monday.
      Each WOD object must conform to the provided schema, including the 'type' property.

      IMPORTANT: Each daily workout MUST be designed to be completed within a standard 60-minute class format. This includes time for a warmup, a strength or skill component, the main conditioning piece, and a cooldown. The 'duration' for each section should reflect this structure, and the total time should be approximately 60 minutes.
      
      A crucial part of making the week interesting is varying the structure and naming of the main workout piece. While 'Metcon' is a common term, you MUST avoid using it repetitively. Instead, use more descriptive and varied titles for the main conditioning section each day. Examples include 'The Gauntlet', 'Engine Builder', 'For Time:', 'AMRAP', 'Death By...', 'The Grinder', 'Cardio Blast', or a creative name that fits the workout's theme. Be creative and mix it up to keep the programming exciting and engaging for the athletes.

      Furthermore, for any strength or weightlifting movements within any section of any day's WOD, you MUST specify the working weight as a percentage of the athlete's 1-repetition max (1RM). For example: "Back Squat: 5 sets of 5 reps @ 75% 1RM". This is a mandatory requirement for all strength-based exercises. For all other specified weights (e.g., for dumbbells or kettlebells), you MUST specify weights for both male (RX M) and female (RX F) athletes in kilograms (kg). For example: "Kettlebell Swings (RX M: 24kg, RX F: 16kg)".

      The weekly structure must be varied and adhere to the following daily requirements:
      - Monday: A challenging individual workout, like a classic CrossFit couplet or triplet. Set 'type' to 'individual'.
      - Tuesday: A skill-focused individual workout, focusing on gymnastics or Olympic lifting technique. Set 'type' to 'individual'.
      - Wednesday: An individual endurance workout. The main conditioning piece MUST be a 'Chipper' style workout designed to last between 35 and 45 minutes. Set 'type' to 'individual'.
      - Thursday: A strength-focused individual workout, centered around a primary lift like squats, deadlifts, or presses. Set 'type' to 'individual'.
      - Friday: A high-intensity individual workout. This should be a short, intense AMRAP or "For Time" workout. Give it a creative name. Set 'type' to 'individual'.
      - Saturday: A named CrossFit "Hero WOD". These are famously difficult workouts named in honor of fallen heroes. It must be a classic or a creative new one. Set 'type' to 'individual'.
      - Sunday: A "Team WOD" designed for pairs (teams of 2). The main workout portion MUST have a duration of at least 30 minutes. Adapt all components for a team format. Set 'type' to 'team'.

      Ensure the goal for each day is motivational and descriptive, and that each WOD has appropriate sections and scaling options. Do NOT include any rest days.
    `;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: fullWeekSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const wodData = JSON.parse(jsonText);

    if (Array.isArray(wodData) && wodData.length === 7) {
      // The API now provides the type, so we can just cast it.
      return wodData as Wod[];
    } else {
      throw new Error("Invalid WOD array structure or incorrect number of days received from API.");
    }

  } catch (error) {
    console.error("Error generating full week WOD:", error);
    throw new Error("Failed to generate a full week of workouts. Please try again later.");
  }
}
