"use client";

import { Container } from "@mantine/core";
import { Hero } from "../components/Hero/Hero";
import { Credits } from "../components/Credits/Credits";
import { Emojis } from "../components/Emojis/Emojis";
import Controls from "../components/Controls/Controls";
import { Tooltip } from "../components/Tooltip/Tooltip";

export default function HomePage() {
  return (
    <Container size="85em">
      <Hero />
      <Controls />
      <Emojis />
      <Credits />
      <Tooltip />
    </Container>
  );
}
