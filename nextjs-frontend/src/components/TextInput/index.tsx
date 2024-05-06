import clsx from "clsx";
import React, { ForwardedRef } from "react";
import ControlledTextInput from "./ControlledTextInput";
import { ControlledTextInputProps } from "./ControlledTextInput";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface TextInputProps extends Omit<ControlledTextInputProps, "size"> {
  classes?: {
    container?: string;
    label?: string;
    input?: string;
    error?: string;
  };
  label: string;
  hideLabel?: boolean;
  size?: "sm" | "md" | "lg";
  error?: string;
  width?: string;
}

const sizes = {
  sm: "py-2",
  md: "py-3",
  lg: "py-4",
};

function TextInput(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const id = props.id || props.name || "";
  const { hideLabel, size = "md", classes = {}, error, ...rest } = props;

  return (
    <div className={clsx(props.className, classes.container, props.width)}>
      <Label
        id={`lbl-${id}`}
        forId={id}
        hidden={hideLabel}
        className={classes.label}
      >
        {props.label}
      </Label>

      <ControlledTextInput
        {...rest}
        ref={ref}
        ariaLabelledby={`lbl-${id}`}
        id={id}
        className={clsx(
          classes.input,
          sizes[size],
          "px-4 w-full border-2 border-gray-200 outline-none focus:border-black",
          { "border-error": error }
        )}
      />

      <div className="h-5 leading-5 overflow-hidden">
        <ErrorMessage error={error} className={classes.error} />
      </div>
    </div>
  );
}

export default React.forwardRef(TextInput);
