import React, { Fragment, ReactElement, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Action from "components/Action";
import DropdownItem from "./DropdownItem";
import clsx from "clsx";
import Button from "components/Button";

interface DropdownProps {
  label: string;
  className?: string;
  children?:
    | ReactElement<typeof DropdownItem>
    | ReactElement<typeof DropdownItem>[];
}

function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className={clsx("relative inline-block", props.className)}>
      <Button
        className="flex items-center px-4"
        style="secondary"
        onClick={toggleDropdown}
      >
        <p className="inline-block">{props.label}</p>
        <ChevronDownIcon
          className={clsx("w-4 ml-2 transition-all", { "rotate-180": open })}
        />
      </Button>
      <ul
        className={clsx(
          "absolute z-50 right-0 w-48 text-right shadow-md mt-2 bg-white",
          {
            hidden: !open,
          }
        )}
      >
        {props.children}
      </ul>
    </div>
  );
}

export default Dropdown;
