export type TTone =
  | "yellow"
  | "lightest"
  | "lighter"
  | "medium"
  | "darker"
  | "darkest"
  | "none"
  | "all";

export type TEmojiCategory =
  | "people"
  | "activity"
  | "nature"
  | "food"
  | "travel"
  | "objects"
  | "symbols"
  | "flags";

export type TEmoji = {
  name: string[];
  emoji: string;
  unicode: string;
  category: string;
  tone: TTone;
};

export type TEmojis = Record<TEmojiCategory, TEmoji[]>;
