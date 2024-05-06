import Image from "next/image";
import React from "react";
import { EmojiHappyIcon, HeartIcon, StarIcon } from "@heroicons/react/solid";

interface SellerImagesProps {
  className?: string;
}

export default function SellersSVG({ className }: SellerImagesProps) {
  const imageOne = "/images/seller_image_one.jpg";

  return (
    <svg viewBox="0 0 105 80" className={className}>
      <foreignObject
        preserveAspectRatio="xMidYMid slice"
        x="0"
        y="0"
        width="48"
        height="70"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <Image layout="fill" src={imageOne} alt="cocinando papas" />
      </foreignObject>

      <foreignObject
        preserveAspectRatio="xMidYMid slice"
        x="28"
        y="32"
        width="72"
        height="48"
        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
      >
        <Image
          layout="fill"
          src="/images/seller_image_two.jpg"
          alt="cortando pan casero"
        />
      </foreignObject>
      <g>
        <circle cx="26" cy="54" r="6" className="fill-primary" />
        <EmojiHappyIcon
          x="22"
          y="50"
          width="8"
          height="8"
          className="text-white"
        />
      </g>
      <g>
        <circle cx="48" cy="32" r="5" className="fill-primary" />
        <HeartIcon x="46" y="30" width="4" height="4" className="text-white" />
      </g>
      <g>
        <circle cx="100" cy="62" r="5" className="fill-primary" />
        <StarIcon x="98" y="60" width="4" height="4" className="text-white" />
      </g>
    </svg>
  );
}
