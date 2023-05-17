import { Text } from "@mantine/core";
import { useCalculatorStore } from "../store";

function CButton({ text }: { text: string }) {
  const firstValue = useCalculatorStore((state) => state.firstValue);
  const updateFirstValue = useCalculatorStore(
    (state) => state.updateFirstValue
  );
  const secondValue = useCalculatorStore((state) => state.secondValue);
  const updateSecondValue = useCalculatorStore(
    (state) => state.updateSecondValue
  );
  const operator = useCalculatorStore((state) => state.operator);
  const updateOperator = useCalculatorStore((state) => state.updateOperator);
  const mode = useCalculatorStore((state) => state.mode);
  const blink = useCalculatorStore((state) => state.blink);
  const blinkHandler = (preV?: string) => {
    if (blink) {
      updateFirstValue("");
      setTimeout(() => updateFirstValue(preV ?? firstValue), 100);
    } else updateFirstValue(preV ?? firstValue);
  };
  const equalityHandler = (
    first: number,
    second: number,
    operator: string | null
  ): number => {
    if (operator !== null) {
      switch (operator) {
        case "+":
          return first + second;
        case "-":
          return first - second;
        case "*":
          return first * second;
        case "/":
          return first / second;
        default:
          return 0;
      }
    } else return first;
  };
  const clickHandler = () => {
    switch (text) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        operator === null
          ? updateFirstValue((firstValue === "0" ? "" : firstValue) + text)
          : updateSecondValue((secondValue === "0" ? "" : secondValue) + text);
        break;
      case ".":
        operator === null
          ? updateFirstValue(
              firstValue.includes(text) ? firstValue : firstValue + text
            )
          : updateSecondValue(
              secondValue.includes(text) ? secondValue : secondValue + text
            );
        break;
      case "+/-":
        operator === null
          ? updateFirstValue(
              firstValue.includes("-")
                ? firstValue.replace("-", "")
                : "-" + firstValue
            )
          : updateSecondValue(
              secondValue.includes("-")
                ? secondValue.replace("-", "")
                : "-" + secondValue
            );
        break;
      case "%": {
        const val = mode ? parseFloat(firstValue) : parseFloat(secondValue);
        const result = val === 0 ? val : val / 100;
        mode
          ? updateFirstValue(result.toString())
          : updateSecondValue(result.toString());
        break;
      }
      case "/":
        blinkHandler();
        updateOperator("/");
        break;
      case "*":
        blinkHandler();
        updateOperator("*");
        break;
      case "-":
        blinkHandler();
        updateOperator("-");
        break;
      case "+":
        blinkHandler();
        updateOperator("+");
        break;
      case "=": {
        const secondV = secondValue;
        updateSecondValue("0");
        updateOperator(null);
        blinkHandler(
          equalityHandler(
            parseFloat(firstValue),
            parseFloat(secondV),
            operator
          ).toString()
        );
        break;
      }
      default: // AC button
        updateSecondValue("0");
        updateOperator(null);
        blinkHandler("0");
    }
  };
  return (
    <Text
      fw={700}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[3],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.gray[5]
            : theme.colors.gray[9],
        fontSize: 24,
        height: 70,
        borderRadius: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      })}
      onClick={clickHandler}
      title={text}
    >
      {text}
    </Text>
  );
}

export default CButton;
