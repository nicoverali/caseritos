import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Action from "components/Action";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div className={clsx("flex my-6 justify-between items-end", className)}>
      <div>
        <p className="font-bold">Caseritos</p>
        <p className="mt-6">© 2021 Caseritos</p>
      </div>

      <div className="flex items-center">
        <p className="uppercase mt-2 mr-6">Seguinos en las redes</p>
        <Action className="mr-4">
          <Image
            src="/icons/facebook.svg"
            alt="facebook link"
            width="24px"
            height="24px"
          />
        </Action>
        <Action className="mr-4">
          <Image
            src="/icons/instagram.svg"
            alt="instagram link"
            width="24px"
            height="24px"
          />
        </Action>
        <Action>
          <Image
            src="/icons/twitter.svg"
            alt="twitter link"
            width="24px"
            height="24px"
          />
        </Action>
      </div>
    </div>
  );
}
