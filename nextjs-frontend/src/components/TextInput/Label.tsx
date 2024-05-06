import clsx from "clsx";
import React from "react";

interface LabelProps {
  children: string;
  forId: string;
  id?: string;
  hidden?: boolean;
  className?: string;
}

function Label(props: LabelProps) {
  const { children, forId, hidden, className } = props;
  return (
    <label
      id={props.id}
      className={clsx(
        "text-sm font-medium block mb-1",
        { hidden: hidden },
        className
      )}
      htmlFor={forId}
    >
      {children}
    </label>
  );
}

export default Label;
