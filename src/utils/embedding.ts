import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const MODEL = 'text-embedding-ada-002';

export async function fetchOpenAIEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined');
  }

  const client = new OpenAI({ apiKey });
  const response = await client.embeddings.create({
    model: MODEL,
    input: text,
  });

  if (!response.data[0]) {
    throw new Error('No embedding returned');
  }

  return response.data[0].embedding;
}
