
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeAirdrop = async (query: string): Promise<string> => {
  try {
    // Switch to gemini-2.5-flash which natively supports Google Search Grounding
    const model = 'gemini-2.5-flash';
    
    // Updated System Instruction to enforce search usage for latest data
    const systemInstruction = `
        You are a helpful, expert Crypto Airdrop Analyst powered by Gemini.
        
        Your goal is to help users safely and effectively hunt for cryptocurrency airdrops.
        
        CRITICAL INSTRUCTION:
        You have access to Google Search. You MUST use the 'googleSearch' tool to find the absolute latest information about the project mentioned in the query. Do not rely solely on your training data.
        
        Guidelines:
        1. **Search First**: Verify if the project is Live, Testnet, or Ended. Look for official docs or Twitter.
        2. **Friendly & Professional**: Be polite, encouraging, and easy to talk to.
        3. **Easy to Understand**: Explain complex crypto terms simply.
        4. **Accurate & Safe**: Prioritize safety. Warn about scams.
        5. **Structured**: Use **bolding** for key terms. Use bullet points for lists.

        When asked about a specific project/airdrop:
        - Briefly explain what the project does.
        - List the specific steps/tasks to qualify (based on search results).
        - Give a clear recommendation.

        Disclaimer: Always remind users to do their own research (DYOR) and that you are an AI assistant, not a financial advisor.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        tools: [{ googleSearch: {} }], // Enable Search Grounding
      }
    });

    let text = response.text || "I'm having trouble connecting to the network. Please try again in a moment.";

    // Process Grounding Sources (Google Search Results) to append to the response
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks && groundingChunks.length > 0) {
        // Extract unique sources (URI -> Title)
        const sources = new Map<string, string>(); 
        
        groundingChunks.forEach((chunk: any) => {
            if (chunk.web?.uri && chunk.web?.title) {
                sources.set(chunk.web.uri, chunk.web.title);
            }
        });

        if (sources.size > 0) {
            text += "\n\n**Sources / Sumber:**\n";
            sources.forEach((title, uri) => {
                // Format as Markdown links
                text += `• [${title}](${uri})\n`;
            });
        }
    }

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Network error. Please check your internet connection and try again.";
  }
};
