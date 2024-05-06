import clsx from "clsx";
import { ActionElement } from "components/Action";
import Button, { ButtonProps } from "components/Button";
import React, { ForwardedRef } from "react";

const sizes = {
  sm: "px-2 py-2",
  md: "px-3 py-3",
  lg: "px-4 py-4",
};

function SquareButton(props: ButtonProps, ref: ForwardedRef<ActionElement>) {
  const { size = "md", className, ...rest } = props;

  return (
    <Button
      {...rest}
      ref={ref}
      size={size}
      className={clsx(sizes[size], className)}
    />
  );
}

export default React.forwardRef(SquareButton);
