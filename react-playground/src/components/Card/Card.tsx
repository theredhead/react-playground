import React from "react";
import type { CSSProperties } from "react";
import { CardHeader } from "./CardHeader";
import type { CardHeaderProps } from "./CardHeader";
import { CardBody } from "./CardBody";
import type { CardBodyProps } from "./CardBody";
import { CardFooter } from "./CardFooter";
import type { CardFooterProps } from "./CardFooter";
import { CardMetaInfo } from "./CardMetaInfo";
import type { CardMetaInfoProps } from "./CardMetaInfo";

import "./Card.scss";

export interface CardProps {
  style?: CSSProperties;
  header: CardHeaderProps;
  body?: CardBodyProps;
  footer?: CardFooterProps;
  meta?: CardMetaInfoProps;
  chips?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  style,
  header,
  body,
  footer,
  meta,
  chips,
}) => (
  <article className="card" style={style}>
    <div className="clip">
      <CardHeader {...header} />
      {chips}
      {meta && <CardMetaInfo {...meta} />}
      {body && <CardBody {...body} />}
      {footer && <CardFooter {...footer} />}
    </div>
  </article>
);
