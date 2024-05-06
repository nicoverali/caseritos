import clsx from "clsx";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  ForwardedRef,
  HTMLProps,
} from "react";

type InputChange = ChangeEvent<HTMLInputElement>;
type TypeEventHandler = (value: string, name: string) => void;

export interface ControlledTextInputProps extends HTMLProps<HTMLInputElement> {
  ariaLabelledby?: string;
  className?: string;
  onType?: TypeEventHandler;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function ControlledTextInput(
  props: ControlledTextInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { onType, onChange, ariaLabelledby, ...rest } = props;

  const changeHandler = (event: InputChange) =>
    onType && onType(event.target.value, event.target.name);

  return (
    <input
      ref={ref}
      aria-labelledby={ariaLabelledby}
      {...rest}
      onChange={onChange || changeHandler}
    />
  );
}

export default React.forwardRef(ControlledTextInput);
