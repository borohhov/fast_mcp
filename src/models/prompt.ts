export interface Prompt {
  id?: number;
  question: string;
  answer: string;
  embedding?: number[];
  created_at?: Date;
}
