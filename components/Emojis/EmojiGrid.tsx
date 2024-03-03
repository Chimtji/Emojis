"use client";

import {
  Box,
  Text,
  ActionIcon,
  Title,
  Divider,
  CopyButton,
} from "@mantine/core";
import classes from "./Emojis.module.css";
import { TEmoji, TEmojiCategory } from "./types";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";

export const EmojiGrid = ({
  header,
  list,
}: {
  header: TEmojiCategory;
  list: TEmoji[];
}) => {
  const { tone, setTooltip } = useStore(
    useShallow((state) => ({ tone: state.tone, setTooltip: state.setTooltip }))
  );
  return (
    <Box>
      <Box w="90%" className={classes.categoryHeader}>
        <Title order={3} tt="capitalize">
          {header}
        </Title>
        <Divider className={classes.divider} />
      </Box>

      <Box className={classes.grid}>
        {list.map((emoji: TEmoji, index: number) => {
          return (
            <CopyButton value={emoji.emoji}>
              {({ copied, copy }) => (
                <ActionIcon
                  onMouseEnter={() =>
                    setTooltip(
                      emoji.name[0].replaceAll(":", "").replaceAll("_", " ")
                    )
                  }
                  onClick={copy}
                  className={classes.icon}
                  key={index}
                  variant="subtle"
                  size="3.5em"
                  data-tone={emoji.tone}
                  data-hide={
                    tone === "all"
                      ? false
                      : emoji.tone === "none"
                      ? false
                      : emoji.tone !== tone
                  }
                  data-category={emoji.category}
                  data-shortnames={emoji.name}
                  data-unicode={emoji.unicode}
                >
                  <Text size="2.5em">{emoji.emoji}</Text>
                </ActionIcon>
              )}
            </CopyButton>
          );
        })}
      </Box>
    </Box>
  );
};
