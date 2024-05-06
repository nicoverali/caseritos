import { MouseEventHandler, useState } from "react";

export type CounterChangeHandler = (value: number) => void;
export type InvalidValueHandler = (value: number) => void;
type IncrementEventHandler = MouseEventHandler<HTMLButtonElement>;
type DecrementEventHandler = MouseEventHandler<HTMLButtonElement>;

export default function useCounter(
  initial = 0,
  min = -Infinity,
  max = Infinity,
  onChange?: CounterChangeHandler,
  onInvalid?: InvalidValueHandler
) {
  const [counter, setCounter] = useState(initial);

  const increment: IncrementEventHandler = () => {
    setCounterWrapper(counter + 1);
  };

  const decrement: DecrementEventHandler = () => {
    setCounterWrapper(counter - 1);
  };

  const setCounterWrapper = (value: string | number) => {
    const newValue = Number(value);
    if (newValue >= min && newValue <= max) {
      setCounter(newValue);
      onChange && onChange(newValue);
      return;
    }
    onInvalid && onInvalid;
  };

  return [counter, setCounterWrapper, increment, decrement] as const;
}
