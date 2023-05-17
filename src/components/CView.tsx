import { Text } from "@mantine/core";
import { useCalculatorStore } from "../store";

function CView() {
  const firstValue = useCalculatorStore((state) => state.firstValue);
  const mode = useCalculatorStore((state) => state.mode);
  const secondValue = useCalculatorStore((state) => state.secondValue);
  return (
    <Text
      title="CView"
      truncate
      ta="right"
      size={48}
      px={5}
      lineClamp={1}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.gray[5]
            : theme.colors.gray[9],
        height: 70,
        borderRadius: 2,
      })}
    >
      {mode ? firstValue : secondValue}
    </Text>
  );
}

export default CView;
