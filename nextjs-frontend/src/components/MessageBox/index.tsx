import clsx from "clsx";
import React, { ReactElement } from "react";
import Message, { MessageProps } from "./Message";

type MessageBoxChild = ReactElement<MessageProps, typeof Message>;

interface MessageBoxProps {
  style?: "error" | "success";
  children?: MessageBoxChild | MessageBoxChild[];
  className?: string;
}

const bgColors = {
  error: "bg-error-light",
  success: "bg-success-light",
};

function MessageBox({ style = "error", children, className }: MessageBoxProps) {
  if (!children) return null;

  const messages = Array.isArray(children) ? children : [children];

  return (
    <ul className={clsx("flex flex-col w-full", bgColors[style], className)}>
      {messages.map((m, idx) => {
        return React.cloneElement(m, {
          key: idx,
          style: m.props.style || style,
        });
      })}
    </ul>
  );
}

export default MessageBox;
