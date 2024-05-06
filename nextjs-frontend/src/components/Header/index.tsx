import AppContainer from "components/AppContainer";
import React, { ReactNode } from "react";
import clsx from "clsx";

export type LiftChangeHandler = (lifted: boolean) => void;
interface HeaderProps {
  bg?: string;
  bgUnlift?: string;
  bgLift?: string;
  lift?: boolean;
  className?: string;
  children?: ReactNode;
}

function Header(props: HeaderProps) {
  const { bgUnlift = "bg-white", bgLift = "bg-white", bg } = props;
  const { lift = false } = props;

  return (
    <header>
      <div
        className={clsx(
          "fixed z-50 top-0 w-full transition-all duration-200",
          !lift && (bg || bgUnlift),
          lift && `${bg || bgLift} shadow`,
          props.className
        )}
      >
        <AppContainer className="flex h-20">{props.children}</AppContainer>
      </div>
      <div className="w-full h-20"></div>
    </header>
  );
}

export default Header;
