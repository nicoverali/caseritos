import Action, { ActionClickEvent, ActionElement } from "components/Action";
import React, { ForwardedRef, ReactNode } from "react";

interface DropdownItemProps {
  href?: string;
  onClick?: ActionClickEvent;
  children?: ReactNode;
}

function DropdownItem(
  { href, onClick, children }: DropdownItemProps,
  ref: ForwardedRef<ActionElement>
) {
  return (
    <li className="mt-1 last:mb-1">
      <Action
        ref={ref}
        onClick={onClick}
        href={href}
        className="inline-block w-full text-right py-2 px-6 bg-white hover:bg-gray-50"
      >
        {children}
      </Action>
    </li>
  );
}

export default React.forwardRef(DropdownItem);
