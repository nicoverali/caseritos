import clsx from "clsx";
import React, { ReactNode } from "react";

export interface MessageProps {
  show: boolean;
  style?: "error" | "success";
  children: ReactNode;
  className?: string;
}

const colors = {
  error: "text-error bg-error-light border-error before:bg-error",
  success: "text-success bg-success-light border-success before:bg-success",
};

function Message(props: MessageProps) {
  if (!props.show) {
    return null;
  }

  return (
    <li
      className={clsx(
        "py-4 px-12 border-l border-r first:border-t last:border-b relative",
        "before:w-1 before:h-1 before:absolute before:top-7 before:left-8",
        "only:before:hidden only:text-center",
        colors[props.style || "error"],
        props.className
      )}
    >
      {props.children}
    </li>
  );
}

export default Message;
