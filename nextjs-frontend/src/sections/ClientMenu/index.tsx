import Button from "components/Button";
import ClientDropdown from "components/ClientDropdown";
import { ClientSessionContext } from "context/ClientSessionProvider";
import { useRouter } from "next/dist/client/router";
import { route } from "next/dist/next-server/server/router";
import Link from "next/link";
import React, { useContext } from "react";

interface ClientMenuProps {
  className?: string;
}

export default function ClientMenu({ className }: ClientMenuProps) {
  const session = useContext(ClientSessionContext);
  const { asPath } = useRouter();

  if (session.isLoggedIn) {
    return (
      <ClientDropdown
        className={className}
        clientName={session.client?.name || ""}
        onLogout={session.logout}
      />
    );
  }
  return (
    <Link href={`/login?redirectUrl=${asPath}`} as="/login" passHref>
      <Button style="secondary" className={className}>
        Ingresar
      </Button>
    </Link>
  );
}
