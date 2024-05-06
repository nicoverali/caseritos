import clsx from "clsx";
import React, { ReactNode } from "react";

interface AppContainerProps {
  children?: ReactNode;
  className?: string;
}

function AppContainer({ className, children }: AppContainerProps) {
  return <div className={clsx("container mx-auto", className)}>{children}</div>;
}

export default AppContainer;
