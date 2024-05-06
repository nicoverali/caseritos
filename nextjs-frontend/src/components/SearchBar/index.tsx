import clsx from "clsx";
import Button, { ButtonProps } from "components/Button";
import TextInput from "components/TextInput";
import React from "react";

interface SearchBarProps extends Pick<ButtonProps, "style" | "size"> {
  label: string;
  name: string;
  placeholder: string;
  buttonLabel: string;
  className?: string;
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className={clsx("flex", props.className)}>
      <TextInput
        label={props.label}
        name={props.name}
        placeholder={props.placeholder}
        size={props.size}
        hideLabel
      />
      <Button size={props.size} style={props.style}>
        {props.buttonLabel}
      </Button>
    </div>
  );
}
