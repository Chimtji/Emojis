"use client";

import { Title, Text, Box, Group, Stack } from "@mantine/core";
import classes from "./Hero.module.css";

export function Hero() {
  return (
    <Stack w="100%" justify="center" gap={0} mb="lg">
      <Title className={classes.title} ta="center" mt={50} lh="0.75em">
        Emojis
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This is a helper tool for finding and copying Emojis
      </Text>
    </Stack>
  );
}
