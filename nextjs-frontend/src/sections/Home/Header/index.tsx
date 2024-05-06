import Button from "components/Button";
import Header from "components/Header";
import HeaderLeft from "components/Header/HeaderLeft";
import HeaderRight from "components/Header/HeaderRight";
import useLiftOnScroll from "components/Header/useLiftOnScroll";
import React from "react";
import ClientMenu from "sections/ClientMenu";
import Navigation from "sections/Navigation";

export default function HomeHeader() {
  const [lift] = useLiftOnScroll();

  const moveToBecomeSeller = () => {
    const element = document.querySelector("#become-seller");

    if (element) {
      // Smooth scroll to that elment
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <Header lift={lift} bgUnlift="bg-transparent">
      <HeaderLeft className="flex items-center bg-white p-4">
        <Navigation />
      </HeaderLeft>
      <HeaderRight className="flex items-center">
        <Button
          style={lift ? "negative" : "default"}
          className="mr-8"
          onClick={moveToBecomeSeller}
        >
          Vender con nosotros
        </Button>
        <ClientMenu />
      </HeaderRight>
    </Header>
  );
}
