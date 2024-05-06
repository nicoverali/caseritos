import Action, { ActionElement, ActionProps } from "components/Action";
import React, { ForwardedRef } from "react";
import clsx from "clsx";

export interface ButtonProps extends Omit<ActionProps, "size" | "style"> {
  style?: "default" | "primary" | "secondary" | "negative";
  size?: "sm" | "md" | "lg";
}

const styles = {
  default: `bg-white ring-black hover:bg-gray-50 active:bg-gray-100 border-transparent`,
  primary: `text-white ring-primary-light bg-primary hover:bg-primary-light active:bg-primary-dark border-transparent`,
  secondary: `text-white bg-black ring-black hover:bg-black-light active:bg-black-dark border-transparent`,
  negative: `bg-white ring-black hover:bg-gray-50 active:bg-gray-100 border-black`,
};

const sizes = {
  sm: "py-2 px-10",
  md: "py-3 px-12",
  lg: "py-4 px-14",
};

function Button(props: ButtonProps, ref: ForwardedRef<ActionElement>) {
  const { size = "md", style = "default", ...rest } = props;
  const baseClass =
    "inline-block group rounded-none outline-none ring-offset-1 focus-visible:ring border-2";

  return (
    <Action
      {...rest}
      ref={ref}
      className={clsx(baseClass, styles[style], sizes[size], props.className, {
        "pointer-events-none": props.disabled,
      })}
    >
      {props.children}
    </Action>
  );
}

export default React.forwardRef<ActionElement, ButtonProps>(Button);
