import { Index } from "@upstash/vector";

// Index throws at construction on an empty url/token, which fails `next build` when
// these env vars are unset, so fall back to placeholders
export const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL || "http://localhost",
  token: process.env.UPSTASH_VECTOR_REST_TOKEN || "unset",
});

export const emojiVectorIndex = new Index<{
  emoji: string;
  label: string;
}>({
  url: process.env.UPSTASH_VECTOR_EMOJI_REST_URL || "http://localhost",
  token: process.env.UPSTASH_VECTOR_EMOJI_REST_TOKEN || "unset",
});
