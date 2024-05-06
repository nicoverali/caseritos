import clsx from "clsx";
import { ActionElement } from "components/Action";
import Button, { ButtonProps } from "components/Button";
import React, { ForwardedRef } from "react";
import { MoonLoader } from "react-spinners";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  className?: string;
}

const sizes = {
  sm: "16px",
  md: "18px",
  lg: "18px",
};

function LoadingButton(
  props: LoadingButtonProps,
  ref: ForwardedRef<ActionElement>
) {
  const { loading, children, className, ...rest } = props;
  return (
    <Button
      {...rest}
      ref={ref}
      className={clsx("relative", className)}
      disabled={loading}
    >
      <div
        className={clsx("absolute translate-center", {
          hidden: !loading,
        })}
      >
        <MoonLoader
          color="currentColor"
          size={sizes[rest.size || "md"]}
          css={`
            text-align: left;
            display: block;
          `}
        />
      </div>
      <div className={clsx({ invisible: loading })}>{children}</div>
    </Button>
  );
}

export default React.forwardRef(LoadingButton);
