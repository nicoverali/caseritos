import React, { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  classNames?: string;
  children: ReactNode;
}

export default function ProductCardContaine(props: ContainerProps) {
  return (
    <div
      className={clsx(
        "flex flex-col ring-black outline-none rounded-none group-focus:ring hover:ring group transition-all duration-200 ease-bounce-in",
        props.classNames
      )}
    >
      {props.children}
    </div>
  );
}
