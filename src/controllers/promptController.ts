import pool from '../config/db';
import { Request, Response } from 'express';
import { Prompt } from '../models/prompt';
import { fetchOpenAIEmbedding } from '../utils/embedding';

export async function createPrompt(req: Request, res: Response) {
  const { question, answer } = req.body as Prompt;
  try {
    const embedding = await fetchOpenAIEmbedding(question);
    const result = await pool.query(
      'INSERT INTO prompts (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    res.json({ ...result.rows[0], embedding });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save prompt' });
  }
}

export async function listPrompts(req: Request, res: Response) {
  try {
    const result = await pool.query('SELECT * FROM prompts ORDER BY created_at DESC');
    const prompts = await Promise.all(
      result.rows.map(async (row: Prompt) => ({
        ...row,
        embedding: await fetchOpenAIEmbedding(row.question),
      }))
    );
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
}
