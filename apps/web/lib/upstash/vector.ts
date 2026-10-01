import { Index } from "@upstash/vector";

// constructed at module scope and throws on a missing token, which fails `next build`
// at page-data collection; only used by dub's internal AI support chat
export const vectorIndex = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL ?? "",
  token: process.env.UPSTASH_VECTOR_REST_TOKEN ?? "",
});

export const emojiVectorIndex = new Index<{
  emoji: string;
  label: string;
}>({
  url: process.env.UPSTASH_VECTOR_EMOJI_REST_URL ?? "",
  token: process.env.UPSTASH_VECTOR_EMOJI_REST_TOKEN ?? "",
});
