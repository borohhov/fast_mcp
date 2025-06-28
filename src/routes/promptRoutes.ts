import { Router } from 'express';
import { createPrompt, listPrompts } from '../controllers/promptController';

const router = Router();

router.post('/', createPrompt);
router.get('/', listPrompts);

export default router;
