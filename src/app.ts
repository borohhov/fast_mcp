import express from 'express';
import promptRoutes from './routes/promptRoutes';

const app = express();

app.use(express.json());
app.use('/prompts', promptRoutes);

export default app;
