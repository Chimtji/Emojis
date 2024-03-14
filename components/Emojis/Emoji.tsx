"use client";

import {
  Text,
  ActionIcon,
  CopyButton,
  MantineStyleProps,
  Tooltip,
} from "@mantine/core";
import classes from "./Emojis.module.css";
import { TEmoji } from "./types";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import { useTimeout } from "@mantine/hooks";

export const Emoji = ({
  data,
  ...rest
}: {
  data: TEmoji;
} & MantineStyleProps) => {
  const [styleTrigger, setStyleTrigger] = useState(false);
  const { start, clear } = useTimeout(() => setStyleTrigger(false), 1000);
  const { tone, setTooltip } = useStore(
    useShallow((state) => ({ tone: state.tone, setTooltip: state.setTooltip }))
  );

  return (
    <CopyButton value={data.emoji} {...rest}>
      {({ copied, copy }) => (
        <Tooltip
          label="Copied"
          withArrow
          position="top"
          opened={copied}
          transitionProps={{ transition: "slide-up", duration: 300 }}
        >
          <ActionIcon
            onMouseLeave={() => {
              setTooltip(undefined);
            }}
            onMouseEnter={() => {
              setTooltip(data.name[0].replaceAll(":", "").replaceAll("_", " "));
            }}
            onClick={() => {
              console.log("click ");
              copy();
              start();
              setStyleTrigger(true);
            }}
            className={classes.iconWrapper}
            classNames={{
              icon: classes.iconInner,
            }}
            variant="subtle"
            size="3.5em"
            data-tone={data.tone}
            data-hide={
              tone === "all"
                ? false
                : data.tone === "none"
                ? false
                : data.tone !== tone
            }
            data-copied={styleTrigger}
            data-category={data.category}
            data-shortnames={data.name}
            data-unicode={data.unicode}
          >
            <span className={classes.top}></span>
            <span className={classes.right}></span>
            <span className={classes.bottom}></span>
            <span className={classes.left}></span>
            <Text size={"2.5em"} style={{ transition: "all 0.2s ease-in-out" }}>
              {data.emoji}
            </Text>
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};
