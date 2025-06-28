import pool from '../config/db';
import { Request, Response } from 'express';
import { Prompt } from '../models/prompt';

export async function createPrompt(req: Request, res: Response) {
  const { question, answer } = req.body as Prompt;
  try {
    const result = await pool.query(
      'INSERT INTO prompts (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save prompt' });
  }
}

export async function listPrompts(req: Request, res: Response) {
  try {
    const result = await pool.query('SELECT * FROM prompts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
}
