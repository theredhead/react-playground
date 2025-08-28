import React from "react";
import "./CardMetaInfo.scss";
import "./CardMetaInfo.scss";

export interface MetaKV {
  k: string;
  v: string;
}

export interface CardMetaInfoProps {
  meta: MetaKV[];
}

export const CardMetaInfo: React.FC<CardMetaInfoProps> = ({ meta }) => (
  <div className="meta">
    {meta.map((m) => (
      <div className="kv" key={`${m.k}:${m.v}`}>
        <span className="k">{m.k}</span>
        <span className="v">{m.v}</span>
      </div>
    ))}
  </div>
);
