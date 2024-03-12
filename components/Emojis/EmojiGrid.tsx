"use client";

import { Box, Title, Divider, MantineStyleProps } from "@mantine/core";
import classes from "./Emojis.module.css";
import { TEmoji, TEmojiCategory } from "./types";
import { Emoji } from "./Emoji";

export const EmojiGrid = ({
  header,
  list,
  ...rest
}: {
  header?: TEmojiCategory;
  list: TEmoji[];
} & MantineStyleProps) => {
  return (
    <Box {...rest}>
      {header && (
        <Box w="90%" className={classes.categoryHeader}>
          <Title order={3} tt="capitalize">
            {header}
          </Title>
          <Divider className={classes.divider} />
        </Box>
      )}

      <Box className={classes.grid} data-length={list.length}>
        {list.length > 0 &&
          list.map((emoji: TEmoji) => {
            return <Emoji data={emoji} key={emoji.name[0]} />;
          })}
      </Box>
    </Box>
  );
};
