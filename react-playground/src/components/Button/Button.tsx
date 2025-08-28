import React from "react";
import "./Button.scss";

export type DangerLevel = "none" | "low" | "medium" | "high";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dangerLevel?: DangerLevel;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  dangerLevel = "none",
  children,
  ...props
}) => {
  let className = "liquid-btn";
  if (dangerLevel !== "none") {
    className += ` danger-${dangerLevel}`;
  }
  if (props.className) {
    className += ` ${props.className}`;
  }
  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  );
};
