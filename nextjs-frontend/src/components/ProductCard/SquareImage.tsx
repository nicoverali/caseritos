import React from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";

export default function SquareImage(props: ImageProps) {
  return (
    <div className="w-full h-auto before:pt-[100%] before:block relative">
      <Image
        {...props}
        alt={props.alt}
        className={clsx(
          "absolute inset-0 w-full h-full object-cover",
          props.className
        )}
      />
    </div>
  );
}
