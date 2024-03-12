import { create } from "zustand";
import { subscribeWithSelector, devtools } from "zustand/middleware";
import { TStore } from "./types";
import { produce } from "immer";
import { getAllEmojis } from "../components/Emojis/helpers";
import { TEmoji, TEmojiCategory, TEmojis } from "../components/Emojis/types";

const useStore = create<TStore>()(
  subscribeWithSelector(
    devtools((set, get) => ({
      allEmojis: getAllEmojis(),
      filteredEmojis: [],
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
      setFilter: (filter) => {
        if (filter == "") {
          set(
            produce((state) => {
              state.filteredEmojis = [];
            })
          );
        } else {
          const list = get().allEmojis;

          const result: TEmoji[] = [];
          Object.keys(list).forEach((category) => {
            list[category as TEmojiCategory].forEach((item) => {
              if (item.name.join("").includes(filter)) {
                result.push(item);
              }
            });
          });

          set(
            produce((state) => {
              state.filteredEmojis = result;
            })
          );
        }
      },
    }))
  )
);
export default useStore;
