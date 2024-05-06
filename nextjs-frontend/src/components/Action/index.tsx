import React, {
  MouseEventHandler,
  ReactNode,
  ForwardedRef,
  HTMLProps,
} from "react";

export type ActionElement = HTMLButtonElement & HTMLAnchorElement;
export type HTMLButtonType = "submit" | "reset" | "button";
export type ActionClickEvent = MouseEventHandler<
  HTMLButtonElement | HTMLAnchorElement
>;

export interface ActionProps
  extends HTMLProps<HTMLButtonElement | HTMLAnchorElement> {
  href?: string;
  type?: HTMLButtonType;
  children: ReactNode;
  className?: string;
  onClick?: ActionClickEvent;
}

function Action(props: ActionProps, ref: ForwardedRef<ActionElement>) {
  const Component = props.href ? "a" : "button";
  const type: HTMLButtonType = props.type || "button";

  return (
    <Component
      {...props}
      ref={ref}
      type={Component == "button" ? type : undefined}
      onClick={props.onClick}
    >
      {props.children}
    </Component>
  );
}

export default React.forwardRef<ActionElement, ActionProps>(Action);
