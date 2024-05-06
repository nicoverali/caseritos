import React from "react";

export default function Underline() {
  return (
    <div
      className="relative w-0 group-hover:w-full transition-all"
      aria-hidden="true"
    >
      <span
        className={`absolute w-full inline-block left-translate-center border-current border-b`}
      />
    </div>
  );
}
