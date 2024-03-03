import { create } from "zustand";
import { subscribeWithSelector, devtools } from "zustand/middleware";
import { TStore } from "./types";
import { produce } from "immer";
import { getAllEmojis } from "../components/Emojis/helpers";

const useStore = create<TStore>()(
  subscribeWithSelector(
    devtools((set, get) => ({
      emojis: getAllEmojis(),
      tone: "yellow",
      tooltip: undefined,
      setTone: (to) => {
        set(
          produce((state) => {
            state.tone = to;
          })
        );
      },
      setTooltip: (to) => {
        set(
          produce((state) => {
            state.tooltip = to;
          })
        );
      },
    }))
  )
);
export default useStore;
