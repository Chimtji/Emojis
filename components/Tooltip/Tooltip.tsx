import { Affix, Paper } from "@mantine/core";
import useStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";

export const Tooltip = () => {
  const { tooltip } = useStore(
    useShallow((state) => ({ tooltip: state.tooltip }))
  );
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Paper
        w="max-content"
        pl="lg"
        pr="lg"
        pt="xs"
        pb="xs"
        shadow="xl"
        withBorder
      >
        {tooltip}
      </Paper>
    </Affix>
  );
};
