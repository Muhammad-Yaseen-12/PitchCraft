import { GoogleGenerativeAI } from "@google/generative-ai";

// env file se key le rahe hain
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Gemini client bana rahe hain
const genAI = new GoogleGenerativeAI(apiKey);

// Model select kar rahe hain (text generation ke liye)
export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
