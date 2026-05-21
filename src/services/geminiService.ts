import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { fallbackQuiz, fallbackCoding, fallbackNews } from './fallbackData';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodingProblem {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  testCases: { input: string; output: string }[];
  solution: string;
  type?: 'mcq' | 'coding' | 'debug';
  options?: string[];
  correctAnswer?: number;
  buggyCode?: string;
  explanation?: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
  category: string;
  readTime: string;
}

export interface QuizResponse {
  questions: QuizQuestion[];
  isOffline: boolean;
}

export interface CodingResponse {
  problems: CodingProblem[];
  isOffline: boolean;
}

export interface NewsResponse {
  articles: NewsArticle[];
  isOffline: boolean;
}

export async function generateQuiz(domain: string, time: number): Promise<QuizResponse> {
  try {
    const numQuestions = Math.min(time, 60);
    const prompt = `Generate a ${numQuestions}-question multiple choice quiz for a ${domain} student. 
    The difficulty should be appropriate for a ${time}-minute session.
    Return the response as a JSON array of objects with the following structure:
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": number (0-3),
      "explanation": "string"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
            },
            required: ["question", "options", "correctAnswer", "explanation"],
          },
        },
      },
    });

    return { questions: JSON.parse(response.text || "[]"), isOffline: false };
  } catch (error) {
    console.error('AI generation failed, using fallback quiz data:', error);
    return { questions: fallbackQuiz, isOffline: true };
  }
}

export async function generateCodingProblems(time: number, language: string = 'JavaScript'): Promise<CodingResponse> {
  try {
    const difficulty = time <= 20 ? 'Easy' : time <= 45 ? 'Medium' : 'Hard';
    const numProblems = Math.min(time, 60);
    const prompt = `Generate ${numProblems} ${language} coding problems with difficulty ${difficulty} for a ${time}-minute session.
    Return the response as a JSON array of objects with the following structure:
    {
      "title": "string",
      "description": "string",
      "difficulty": "Easy" | "Medium" | "Hard",
      "testCases": [{"input": "string", "output": "string"}],
      "solution": "string"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
              testCases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    input: { type: Type.STRING },
                    output: { type: Type.STRING },
                  },
                },
              },
              solution: { type: Type.STRING },
            },
            required: ["title", "description", "difficulty", "testCases", "solution"],
          },
        },
      },
    });

    return { problems: JSON.parse(response.text || "[]"), isOffline: false };
  } catch (error) {
    console.error('AI generation failed, using fallback coding data:', error);
    return { problems: fallbackCoding, isOffline: true };
  }
}

export async function generateNews(time: number): Promise<NewsResponse> {
  try {
    const numArticles = Math.min(time, 60);
    const prompt = `Generate ${numArticles} short summarized news articles in categories like Education, Tech, and General.
    Return the response as a JSON array of objects with the following structure:
    {
      "title": "string",
      "summary": "string",
      "category": "string",
      "readTime": "string"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING },
              readTime: { type: Type.STRING },
            },
            required: ["title", "summary", "category", "readTime"],
          },
        },
      },
    });

    return { articles: JSON.parse(response.text || "[]"), isOffline: false };
  } catch (error) {
    console.error('AI generation failed, using fallback news data:', error);
    return { articles: fallbackNews, isOffline: true };
  }
}

export interface Recommendation {
  title: string;
  time: number;
  type: 'Academic' | 'Tech' | 'General';
  reason: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  createdAt: string;
}

export async function getRecommendations(history: { domain: string; title: string }[]): Promise<Recommendation[]> {
  try {
    const historySummary = history.map(h => `${h.domain}: ${h.title}`).join(', ');
    const prompt = `Based on the user's learning history: [${historySummary}], suggest 3 personalized learning tasks for their next free time session.
    For 'Tech' tasks, suggest problems in languages the user has previously used or common ones like JavaScript, Python, C++, or Java.
    Return the response as a JSON array of objects with the following structure:
    {
      "title": "string",
      "time": number (minutes),
      "type": "Academic" | "Tech" | "General",
      "reason": "short explanation why this is recommended"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              time: { type: Type.INTEGER },
              type: { type: Type.STRING, enum: ["Academic", "Tech", "General"] },
              reason: { type: Type.STRING },
            },
            required: ["title", "time", "type", "reason"],
          },
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error('Failed to get personalized recommendations, using fallbacks:', error);
    return [
      { title: "Review Chemistry Elements", time: 10, type: "Academic", reason: "Quick review of basic molecular chemistry concepts." },
      { title: "Solve Binary Search Tree Tree Height", time: 20, type: "Tech", reason: "Sharpen recursion logic with trees." },
      { title: "Read Tech Advancements in Quantum Computing", time: 15, type: "General", reason: "Stay informed about emerging technologies." }
    ];
  }
}

export async function generateNoteSummary(content: string): Promise<string> {
  try {
    const prompt = `Summarize the following learning content into a single "Aha!" moment or key takeaway (max 2 sentences):
    ${content}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "No summary generated.";
  } catch (error) {
    console.error('Failed to generate note summary, using local substring extraction:', error);
    if (content.length <= 100) return content;
    return content.slice(0, 100) + '...';
  }
}
