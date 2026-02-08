
import { GoogleGenAI } from "@google/genai";
import { MapStyle } from '../types';

/**
 * Generates a city map image using gemini-2.5-flash-image.
 */
export const generateCityMap = async (city: string, style: MapStyle): Promise<{ imageUrl: string }> => {
  // Use the default API key provided in the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Generate a high-resolution artistic metropolitan road map of the city of ${city}. 
  
  PERSPECTIVE: Perfectly flat orthographic top-down bird's-eye view.
  VIEW: Metropolitan scale, showing the city footprint including bridges, main arteries, and coastlines.
  
  STYLE: The map MUST be rendered strictly in the ${style.name} aesthetic.
  STYLE DETAILS: ${style.promptAddon}.
  
  Focus on a beautiful cartographic composition. 
  Keep it 2D top-down, no 3D buildings, no side-view distortion.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    const candidate = response.candidates?.[0];
    if (!candidate) throw new Error("No response from AI.");

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return {
          imageUrl: `data:image/png;base64,${part.inlineData.data}`
        };
      }
    }

    throw new Error("AI failed to return an image.");
  } catch (error: any) {
    console.error("Error generating map:", error);
    throw error;
  }
};
