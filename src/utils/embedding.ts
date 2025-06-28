export function textEmbedding(text: string): number[] {
  const counts = Array(26).fill(0);
  for (const char of text.toLowerCase()) {
    const code = char.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      counts[code - 97] += 1;
    }
  }
  const len = text.length || 1;
  return counts.map((c) => c / len);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) {
    return 0;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
