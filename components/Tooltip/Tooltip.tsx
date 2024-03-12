import { Affix, Paper, Transition } from "@mantine/core";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useTimeout } from "@mantine/hooks";

export const Tooltip = () => {
  const [open, setOpen] = useState(false);
  const { start, clear } = useTimeout(() => {
    setOpen(false);
  }, 5000);

  const { tooltip } = useStore(
    useShallow((state) => ({ tooltip: state.tooltip }))
  );

  useEffect(() => {
    if (tooltip) {
      clear();
      setOpen(true);
      start();
    } else {
      setOpen(false);
    }
  }, [tooltip]);

  return (
    <Affix position={{ bottom: 20, right: "50%" }} ml="-50%">
      <Transition mounted={open} transition="slide-up">
        {(styles) => (
          <Paper
            style={styles}
            w="max-content"
            pl="lg"
            pr="lg"
            pt="xs"
            pb="xs"
            shadow="xl"
            withBorder
            ml="40%"
          >
            {tooltip}
          </Paper>
        )}
      </Transition>
    </Affix>
  );
};
