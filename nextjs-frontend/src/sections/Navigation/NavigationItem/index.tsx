import Action from "components/Action";
import Link from "next/link";
import React, { ReactNode } from "react";

interface NavigationItemProps {
  href: string;
  children: ReactNode;
}

export default function NavigationItem(props: NavigationItemProps) {
  return (
    <Link href={props.href} passHref>
      <Action className="ml-8 hover:underline hover:text-black-light outline-none ring-black focus-visible:ring focus-visible:px-4 transition-all">
        {props.children}
      </Action>
    </Link>
  );
}
