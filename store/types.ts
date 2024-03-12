import { TEmoji, TEmojis, TTone } from "../components/Emojis/types";

export type TStore = {
  tone: TTone;
  allEmojis: TEmojis;
  filteredEmojis: TEmoji[];
  tooltip: string | undefined;
  setTone: (to: TTone) => void;
  setTooltip: (to: string | undefined) => void;
  setFilter: (filter: string) => void;
};
