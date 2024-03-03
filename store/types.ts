import { TEmojis, TTone } from "../components/Emojis/types";

export type TStore = {
  tone: TTone;
  emojis: TEmojis;
  tooltip: string | undefined;
  setTone: (to: TTone) => void;
  setTooltip: (to: string) => void;
};
