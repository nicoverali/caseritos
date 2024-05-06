import React, { ReactNode } from "react";

interface BigTitleProps {
  children?: ReactNode;
}

export default function BigTitle({ children }: BigTitleProps) {
  return <h1 className="block font-medium text-6xl pt-12 pb-12">{children}</h1>;
}
