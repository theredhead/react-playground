import React from "react";
import "./CardFooter.scss";

export interface CardFooterProps {
  children?: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children }) => (
  <div className="footer">{children}</div>
);
