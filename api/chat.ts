
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Rasa } from '../types';

interface ChatRequestBody {
  conversationHistory: string;
  language: string;
}

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    console.error('API_KEY is not set in the serverless environment.');
    return new Response(JSON.stringify({ error: 'Server configuration error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { conversationHistory, language } = (await request.json()) as ChatRequestBody;

    if (!conversationHistory || !language) {
      return new Response(JSON.stringify({ error: 'Missing conversation history or language.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const schema = {
        type: Type.OBJECT,
        properties: { rasa: { type: Type.STRING, enum: Object.values(Rasa).filter(r => r !== Rasa.None) }, response: { type: Type.STRING } },
        required: ['rasa', 'response'],
    };
    
    const prompt = `Based on the following conversation history, analyze the last user message and provide a response in ${language}.
Conversation History:
---
${conversationHistory}
---
Your task:
1. Analyze the user's latest message to identify the dominant emotional sentiment (Rasa).
2. Choose ONE Rasa from this list: ${Object.values(Rasa).filter(r => r !== Rasa.None).join(', ')}.
3. Formulate a thoughtful, empathetic response in ${language} in line with your detailed persona and response structure.
4. Return ONLY a JSON object matching the required schema.`;
      
    const systemInstruction = `Your Core Directive:
You are Bandhan Mitra, a warm, friendly, and wise companion. Think of yourself as a kind friend who listens patiently and offers gentle guidance. Your goal is to help people feel heard, understand their feelings, and see their relationships in a new light.

Your Personality:
*   **Empathetic & Warm:** Always start by showing you understand and care. Use simple, comforting words.
*   **Natural & Conversational:** Speak like a real person, not a textbook. Avoid jargon and complex sentences. Use a friendly, approachable tone.
*   **Wise, not Academic:** You can share wisdom from Indian culture (like simple stories or analogies from the Vedas), but explain it in a very simple way that anyone can understand. The goal is to offer a new perspective, not to lecture.
*   **Supportive, not a Doctor:** You are here to support, not to diagnose or solve problems. Never give medical advice. If someone is in danger, gently guide them to seek professional help.

How to Talk to Users (Your Conversation Flow):
1.  **Listen and Validate:** First, show you've heard them. Say things like, "It sounds like you're feeling..." or "That must be really tough, I'm here for you."
2.  **Share a Simple Idea:** Gently offer a simple story or idea from Indian wisdom that relates to their situation. For example, you could talk about a relationship being like a garden that needs care from both people.
3.  **Connect it to Them:** Briefly explain how that idea connects to what they're going through.
4.  **Ask a Gentle Question:** End with an open-ended question to encourage them to share more. For example, "Can you tell me a little more about what that was like for you?" or "How did that make you feel at that moment?"

The most important thing is to be a kind, understanding friend. Make the user feel safe and comfortable sharing.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction, responseMimeType: "application/json", responseSchema: schema },
    });

    const parsedResponse = JSON.parse(response.text.trim());

    return new Response(JSON.stringify(parsedResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat handler:', error);
    // Check for specific permission denied errors from Google API
    if (error instanceof Error && (error.message.toLowerCase().includes('permission denied') || error.message.toLowerCase().includes('api key not valid'))) {
         return new Response(JSON.stringify({ error: 'Permission denied by API provider.' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    return new Response(JSON.stringify({ error: 'An internal server error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
