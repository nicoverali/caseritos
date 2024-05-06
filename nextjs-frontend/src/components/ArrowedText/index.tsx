import React from "react";
import { ArrowNarrowRightIcon, ArrowRightIcon } from "@heroicons/react/outline";
import clsx from "clsx";

interface ArrowedTextProps {
  label: string;
  classes?: {
    container?: string;
    label?: string;
    arrow?: string;
  };
  arrowSize?: "normal" | "narrow";
  className?: string;
}

export default function ArrowedText(props: ArrowedTextProps) {
  const classes = props.classes || {};
  const Arrow =
    props.arrowSize == "narrow" ? ArrowNarrowRightIcon : ArrowRightIcon;

  return (
    <div className={clsx("flex items-center group", classes.container)}>
      <span className={clsx("text-sm mr-2", classes.label)}>{props.label}</span>
      <Arrow className={clsx("w-4", classes.arrow)} />
    </div>
  );
}
