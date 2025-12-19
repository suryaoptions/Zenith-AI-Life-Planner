
import { GoogleGenAI, Type } from "@google/genai";
import { Goal, UserPreferences } from "../types";

// Fix: Initialize GoogleGenAI exclusively with process.env.API_KEY as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRoutine = async (goals: Goal[], preferences: UserPreferences) => {
  const prompt = `Act as an expert life coach and routine architect. 
  Create a highly optimized daily routine based on these goals: ${goals.map(g => g.title).join(', ')}.
  User preferences: Wake up at ${preferences.wakeUpTime}, Sleep at ${preferences.sleepTime}, Peak focus in the ${preferences.focusTime}.
  Interests: ${preferences.interests.join(', ')}.
  
  Format the output as a JSON array of objects with fields: time, activity, duration, and category.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            time: { type: Type.STRING, description: 'Start time of activity' },
            activity: { type: Type.STRING, description: 'Description of what to do' },
            duration: { type: Type.STRING, description: 'Duration in minutes or hours' },
            category: { type: Type.STRING, description: 'Category like Deep Work, Rest, Movement, or Skill Acquisition' }
          },
          propertyOrdering: ["time", "activity", "duration", "category"],
          required: ['time', 'activity', 'duration', 'category']
        }
      }
    }
  });

  // Fix: Directly access the .text property (do not call as a method)
  const jsonStr = (response.text || '[]').trim();
  return JSON.parse(jsonStr);
};

export const getAIInsight = async (goals: Goal[], currentRoutine: any[]) => {
  const prompt = `Analyze my current life plan.
  Goals: ${JSON.stringify(goals)}
  Current Routine: ${JSON.stringify(currentRoutine)}
  
  Provide 3 actionable insights to improve productivity or well-being.
  Keep it concise and encouraging.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class productivity expert and habit scientist like James Clear or Andrew Huberman."
    }
  });

  // Fix: Directly access the .text property
  return response.text;
};

export const chatWithCoach = async (message: string, history: { role: string, parts: { text: string }[] }[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are Zenith, an AI life coach. Your goal is to help the user design a life of meaning and high performance. Be supportive, evidence-based, and practical."
    }
  });
  
  // Fix: sendMessage returns a GenerateContentResponse where .text is used
  const response = await chat.sendMessage({ message });
  return response.text;
};
