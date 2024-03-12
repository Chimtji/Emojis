"use client";

import { Box } from "@mantine/core";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { EmojiGrid } from "./EmojiGrid";

export const Emojis = () => {
  const { allData, filteredData } = useStore(
    useShallow((state) => ({
      allData: state.allEmojis,
      filteredData: state.filteredEmojis,
    }))
  );

  return (
    <Box w="100%">
      <Box>
        {filteredData.length > 0 ? (
          <EmojiGrid list={filteredData} mt="2em" />
        ) : (
          <>
            <EmojiGrid header="people" list={allData.people} />
            <EmojiGrid header="activity" list={allData.activity} />
            <EmojiGrid header="food" list={allData.food} />
            <EmojiGrid header="nature" list={allData.nature} />
            <EmojiGrid header="travel" list={allData.travel} />
            <EmojiGrid header="objects" list={allData.objects} />
            <EmojiGrid header="symbols" list={allData.symbols} />
            <EmojiGrid header="flags" list={allData.flags} />
          </>
        )}
      </Box>
    </Box>
  );
};
