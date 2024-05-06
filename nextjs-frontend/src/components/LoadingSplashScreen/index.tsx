import React from "react";
import { MoonLoader } from "react-spinners";

export default function LoadingSplashScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <MoonLoader size="40px" />
    </div>
  );
}
