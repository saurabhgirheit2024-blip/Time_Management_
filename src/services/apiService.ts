import { 
  generateQuiz, 
  generateCodingProblems, 
  generateNews, 
  generateNoteSummary, 
  getRecommendations,
  QuizResponse,
  CodingResponse,
  NewsResponse,
  Recommendation
} from './geminiService';

export interface ExecutionResult {
  output: string;
  error: boolean;
}

export async function executeCode(code: string, language: string, input: string = ''): Promise<ExecutionResult> {
  try {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, input }),
    });
    
    const data = await response.json();
    return {
      output: data.error ? `Error:\n${data.output}` : (data.output || 'Code executed successfully (no output).'),
      error: !!data.error
    };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      output: `Execution Error: ${error.message}`,
      error: true
    };
  }
}

export const apiService = {
  generateQuiz,
  generateCodingProblems,
  generateNews,
  generateNoteSummary,
  getRecommendations,
  executeCode
};
