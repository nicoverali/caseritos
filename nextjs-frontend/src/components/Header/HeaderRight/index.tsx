import React, { ReactNode } from "react";

export interface HeaderRightProps {
  className?: string;
  children?: ReactNode;
}

export default function HeaderRight(props: HeaderRightProps) {
  return <div className={"ml-auto " + props.className}>{props.children}</div>;
}
