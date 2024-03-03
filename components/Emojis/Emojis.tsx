"use client";

import { Box } from "@mantine/core";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { EmojiGrid } from "./EmojiGrid";

export const Emojis = () => {
  const { emojis: data } = useStore(
    useShallow((state) => ({ emojis: state.emojis }))
  );

  return (
    <Box w="100%">
      <Box>
        <EmojiGrid header="people" list={data.people} />
        <EmojiGrid header="activity" list={data.activity} />
        <EmojiGrid header="food" list={data.food} />
        <EmojiGrid header="nature" list={data.nature} />
        <EmojiGrid header="travel" list={data.travel} />
        <EmojiGrid header="objects" list={data.objects} />
        <EmojiGrid header="symbols" list={data.symbols} />
        <EmojiGrid header="flags" list={data.flags} />
      </Box>
    </Box>
  );
};
