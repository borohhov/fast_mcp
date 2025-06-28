import pool from '../config/db';
import { Request, Response } from 'express';
import { Prompt } from '../models/prompt';
import { textEmbedding, cosineSimilarity } from '../utils/embedding';

export async function createPrompt(req: Request, res: Response) {
  const { question, answer } = req.body as Prompt;
  try {
    const embedding = textEmbedding(question);
    const result = await pool.query(
      'INSERT INTO prompts (question, answer, embedding) VALUES ($1, $2, $3) RETURNING *',
      [question, answer, JSON.stringify(embedding)]
    );
    res.json({ ...result.rows[0], embedding });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save prompt' });
  }
}

export async function listPrompts(req: Request, res: Response) {
  try {
    const search = typeof req.query.q === 'string' ? req.query.q : undefined;
    if (search) {
      const queryEmbedding = textEmbedding(search);
      const result = await pool.query('SELECT * FROM prompts');
      const prompts = result.rows.map((row: any) => {
        const emb: number[] = row.embedding ? JSON.parse(row.embedding) : [];
        const similarity = cosineSimilarity(queryEmbedding, emb);
        return { ...row, similarity };
      });
      prompts.sort((a, b) => b.similarity - a.similarity);
      res.json(prompts);
    } else {
      const result = await pool.query('SELECT * FROM prompts ORDER BY created_at DESC');
      res.json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
}
