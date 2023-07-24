import React from "react";

export interface ButtonProps {
  label: string;
}

export function Button(props: ButtonProps) {
  return <button>{props.label} </button>;
}
