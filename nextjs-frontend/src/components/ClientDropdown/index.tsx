import { ActionClickEvent } from "components/Action";
import Dropdown from "components/Dropdown";
import DropdownItem from "components/Dropdown/DropdownItem";
import Link from "next/link";
import React from "react";

interface ClientDropdownProps {
  className?: string;
  clientName: string;
  onLogout: ActionClickEvent;
}

export default function ClientDropdown({
  className,
  clientName,
  onLogout,
}: ClientDropdownProps) {
  return (
    <Dropdown label={clientName} className={className}>
      <Link href="/orders" passHref>
        <DropdownItem>Mis ordenes</DropdownItem>
      </Link>
      <DropdownItem onClick={onLogout}>Salir</DropdownItem>
    </Dropdown>
  );
}
