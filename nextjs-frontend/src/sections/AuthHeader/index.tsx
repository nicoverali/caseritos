import React from "react";
import Header from "components/Header";
import HeaderLeft from "components/Header/HeaderLeft";
import useLiftOnScroll from "components/Header/useLiftOnScroll";
import Navigation from "sections/Navigation";

export default function DefaultHeader() {
  const [lift] = useLiftOnScroll();

  return (
    <Header lift={lift}>
      <HeaderLeft className="flex items-center">
        <Navigation />
      </HeaderLeft>
    </Header>
  );
}
