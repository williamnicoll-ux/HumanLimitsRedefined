import { GoogleGenerativeAI } from "@google/genai";
import { WorldRecord } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateRecordInsight(record: WorldRecord) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `
    Give me a fun, short insight or fact about this Guinness World Record:
    Title: ${record.title}
    Description: ${record.description}
    Category: ${record.category}
    
    Make it engaging for a social media platform. Limit to 2 sentences.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Wow, that is an incredible record!";
  }
}

export async function fetchMockRecords(): Promise<Partial<WorldRecord>[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `
    Generate 5 real or very realistic Guinness World Records that happened in 2024 or 2025.
    Include: title, description (max 100 words), category, holder, dateSet, location, tags (array), imageUrl (suggest a Unsplash search keyword for the image).
    Return as a JSON array.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Basic cleanup of markdown if present
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini Mock Error:", error);
    return [];
  }
}
