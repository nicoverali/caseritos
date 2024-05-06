import React, { ReactNode } from "react";

export interface HeaderLeftProps {
  className?: string;
  children?: ReactNode;
}

export default function HeaderLeft(props: HeaderLeftProps) {
  return <div className={props.className}>{props.children}</div>;
}
