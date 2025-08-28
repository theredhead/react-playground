import React from "react";

export interface CardHeaderProps {
  avatar?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  avatar,
  title,
  subtitle,
}) => (
  <div className="header">
    {avatar && <div className="avatar">{avatar}</div>}
    <div>
      <div className="title">{title}</div>
      {subtitle && <div className="subtitle">{subtitle}</div>}
    </div>
  </div>
);
