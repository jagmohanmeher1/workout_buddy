
import { GoogleGenAI } from "@google/genai";
import { WorkoutType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRecommendedGyms = async (lat: number, lng: number, workoutType: WorkoutType) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find popular ${workoutType} locations or public spaces near coordinates (${lat}, ${lng}). Provide a short list of places where people usually work out.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });

    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error fetching gyms from Gemini:", error);
    return { text: "Could not fetch nearby spots.", grounding: [] };
  }
};

export const generateWorkoutMotivation = async (type: WorkoutType) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Give me a 2-sentence highly motivating workout quote for someone about to go for a ${type} session. Be energetic and supportive.`,
    });
    return response.text;
  } catch (error) {
    return "Push your limits today! Every rep counts.";
  }
};
