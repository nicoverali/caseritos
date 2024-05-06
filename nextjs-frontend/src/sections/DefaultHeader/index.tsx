import clsx from "clsx";
import Action from "components/Action";
import Button from "components/Button";
import React from "react";
import Header from "components/Header";
import HeaderLeft from "components/Header/HeaderLeft";
import HeaderRight from "components/Header/HeaderRight";
import useLiftOnScroll from "components/Header/useLiftOnScroll";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import ClientMenu from "sections/ClientMenu";
import Navigation from "sections/Navigation";

interface DefaultHeaderProps {
  back?: boolean;
}

export default function DefaultHeader(props: DefaultHeaderProps) {
  const [lift] = useLiftOnScroll();

  return (
    <Header lift={lift}>
      <HeaderLeft className="flex items-center">
        {props.back && (
          <Action className="mr-4">
            <ArrowLeftIcon className="w-6" />
          </Action>
        )}

        <Navigation />
      </HeaderLeft>
      <HeaderRight className="flex items-center">
        <ClientMenu />
      </HeaderRight>
    </Header>
  );
}
