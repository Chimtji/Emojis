"use client";

import { Box, Group, Radio, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./Controls.module.css";
import { TTone } from "../Emojis/types";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect } from "react";

const Controls = () => {
  const [search, setSearch] = useDebouncedState("", 200);
  const { tone, setTone, setFilter } = useStore(
    useShallow((state) => ({
      tone: state.tone,
      setTone: state.setTone,
      setFilter: state.setFilter,
    }))
  );
  const tones: TTone[] = [
    "yellow",
    "lightest",
    "lighter",
    "medium",
    "darker",
    "darkest",
    "all",
  ];

  useEffect(() => {
    setFilter(search);
  }, [search]);

  return (
    <Box>
      <TextInput
        maw="50em"
        m="auto"
        size="lg"
        placeholder="Search for an emoji"
        leftSection={<IconSearch />}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <Radio.Group
        w="max-content"
        name="favoriteFramework"
        m="auto"
        mt="lg"
        value={tone}
        onChange={(value) => setTone(value as TTone)}
      >
        <Group mt="xs">
          {tones.map((tone) => (
            <Radio
              key={tone}
              value={tone}
              data-tone={tone}
              classNames={{
                inner: classes.radioInner,
                radio: classes.radioRadio,
                icon: classes.radioIcon,
              }}
            />
          ))}
        </Group>
      </Radio.Group>
    </Box>
  );
};

export default Controls;
