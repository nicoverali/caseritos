import clsx from "clsx";
import React from "react";

interface ErrorMessageProps {
  error?: string;
  className?: string;
}

function ErrorMessage({ error, className }: ErrorMessageProps) {
  return (
    <p
      className={clsx("text-xs mt-1 text-error", { hidden: !error }, className)}
    >
      {error}
    </p>
  );
}

export default ErrorMessage;
