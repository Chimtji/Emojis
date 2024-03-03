'use client';

import { Text, Anchor } from '@mantine/core';

export function Credits() {
  return (
    <Text c="dimmed" ta="center" size="sm" maw={580} mx="auto" mt="xl" pb="xl">
      Made with 🔥 by <Anchor href="https://github.com/Chimtji">Chimtji</Anchor>
    </Text>
  );
}
