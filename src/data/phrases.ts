export interface PhraseStyle {
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
  rotation: number;
  delay: number;
}

export interface PhraseEntry {
  id: string;
  text: string;
  author: string;
  context?: string;
  style: PhraseStyle;
  media?: {
    type: "youtube" | "image" | "link";
    src: string;
    caption?: string;
  };
}

export const phrases: PhraseEntry[] = [];

export function getPhraseById(id: string): PhraseEntry | undefined {
  return phrases.find((p) => p.id === id);
}
