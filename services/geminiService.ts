
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface RecommendationResponse {
  reasoning: string;
  suggestedThemes: string[];
  recommendedProductIds: string[];
}

export const getPosterRecommendations = async (userPrompt: string, products: Product[]): Promise<RecommendationResponse> => {
  try {
    // On prépare une liste simplifiée du catalogue pour ne pas saturer le prompt
    const catalogSummary = products.map(p => `- ${p.title} (ID: ${p.id}, Catégorie: ${p.category})`).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tu es Lumia, l'expert en décoration d'intérieur de Pixlumia.
                 Voici notre catalogue actuel :
                 ${catalogSummary}

                 L'utilisateur demande : "${userPrompt}".
                 
                 Consignes :
                 1. Analyse l'ambiance recherchée.
                 2. Sélectionne parmi le catalogue ci-dessus les produits (IDs) les plus pertinents (maximum 3).
                 3. Propose également des thèmes de recherche plus larges.
                 4. Ta réponse doit être en JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reasoning: {
              type: Type.STRING,
              description: "Analyse concise et conseil déco.",
            },
            suggestedThemes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Mots-clés pour filtrer la boutique.",
            },
            recommendedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Les IDs des produits du catalogue que tu recommandes.",
            }
          },
          required: ["reasoning", "suggestedThemes", "recommendedProductIds"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Empty response");
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reasoning: "Désolé, je rencontre une petite difficulté. Mais je vous suggère de regarder nos nouveautés !",
      suggestedThemes: ["Films", "Jeux Vidéo"],
      recommendedProductIds: []
    };
  }
};
