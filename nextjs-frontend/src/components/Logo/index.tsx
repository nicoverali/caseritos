import React from "react";
import Image from "next/image";

interface LogoProps {
  style?: "full" | "compact";
  width: string;
  height: string;
}

export default function Logo({ style = "full", ...props }: LogoProps) {
  const logo = `/images/logo_${style}.png`;
  return <Image priority src={logo} alt="caseritos logo" {...props} />;
}
