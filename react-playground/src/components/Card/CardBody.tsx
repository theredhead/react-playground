import React from "react";

export interface CardBodyProps {
  children?: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ children }) => (
  <div className="body">{children}</div>
);
