import React from "react";
import styles from "./CardHeader.module.scss";

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
  <div className={styles.header}>
    {avatar && <div className={styles.avatar}>{avatar}</div>}
    <div>
      <div className={styles.title}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  </div>
);
