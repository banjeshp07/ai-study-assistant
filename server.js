import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Gen AI client with server-side environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate-study-material', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // System instruction to force strict JSON structured output
    const systemInstruction = `
      You are an expert AI study assistant. Your job is to take free-form user notes or text and convert them into structured study material.
      You MUST return ONLY a valid JSON object matching this exact schema, with no markdown formatting around it if possible, or inside standard json blocks.
      Generate exactly 5 to 6 multiple-choice questions in the quiz array.
      {
        "topic": "Title of the topic",
        "flashcards": [
          { "id": 1, "front": "Question or concept", "back": "Clear, concise answer" }
        ],
        "quiz": [
          {
            "id": 1,
            "question": "Multiple choice question?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctIndex": 0,
            "explanation": "Why this answer is correct"
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [prompt],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json', // Ensures structured JSON output from Gemini
      },
    });

    const textResult = response.text;
    const parsedData = JSON.parse(textResult);

    res.json(parsedData);
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate study material from AI.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});