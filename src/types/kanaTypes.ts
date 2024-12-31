export interface KanaEntry {
  reading: string;
  index: number;
}
export type KanaMap = Record<string, KanaEntry>;

export type KanaType = "hiragana" | "katakana";

export interface HiraganaLetter {
  letter: string;
  entry: KanaEntry;
}
