import Action from "components/Action";
import Logo from "components/Logo";
import { ClientSessionContext } from "context/ClientSessionProvider";
import Link from "next/link";
import React, { useContext } from "react";
import NavigationItem from "./NavigationItem";

export default function Navigation() {
  const { isLoggedIn } = useContext(ClientSessionContext);

  return (
    <nav>
      <Link href="/" passHref>
        <Action className="align-middle">
          <Logo width="34" height="36" style="compact" />
        </Action>
      </Link>

      <NavigationItem href="/products">Productos</NavigationItem>

      {isLoggedIn && (
        <NavigationItem href="/orders">Mis ordenes</NavigationItem>
      )}
    </nav>
  );
}
