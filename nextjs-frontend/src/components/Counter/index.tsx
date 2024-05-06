import React from "react";
import SquareButton from "components/SquareButton";
import TextInput from "components/TextInput";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import useCounter, {
  CounterChangeHandler,
  InvalidValueHandler,
} from "./useCounter";

interface CounterProps {
  input: {
    name: string;
    label: string;
    min?: number;
    max?: number;
    error?: string;
    onChange?: CounterChangeHandler;
    onInvalid?: InvalidValueHandler;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

const iconSizes = {
  sm: "w-6",
  md: "w-6",
  lg: "w-6",
};

function Counter(props: CounterProps) {
  const { input } = props;
  const { size = "md", className } = props;
  const { onChange, onInvalid, ...inputRest } = props.input;
  const [counter, setCounter, increment, decrement] = useCounter(
    input.min,
    input.min,
    input.max,
    onChange,
    onInvalid
  );

  return (
    <div className={clsx("flex", className)}>
      <SquareButton
        aria-label="Decrementar cantidad"
        className="z-10"
        size={size}
        onClick={decrement}
        style="secondary"
      >
        <MinusIcon className={iconSizes[size]} />
      </SquareButton>

      <TextInput
        {...inputRest}
        type="number"
        hideLabel
        size={size}
        value={counter}
        onType={setCounter}
        error={input.error}
        classes={{
          container: "focus:z-20 flex-grow",
          input: "text-center w-full h-full py-0 hide-number-spin",
        }}
      />

      <SquareButton
        aria-label="Incrementar cantidad"
        className="z-10"
        size={size}
        onClick={increment}
        style="secondary"
      >
        <PlusIcon className={iconSizes[size]} />
      </SquareButton>
    </div>
  );
}

export default Counter;
