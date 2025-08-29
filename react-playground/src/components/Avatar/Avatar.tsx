import React from "react";
import md5 from "./md5";

export interface AvatarProps {
  name?: string;
  email?: string;
  size?: number; // px
  rating?: "g" | "pg" | "r" | "x";
}

function stringToColor(str: string): string {
  // Simple hash to color
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "#" + "00000".substring(0, 6 - c.length) + c;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);
}

function getGravatarUrl(email: string, size: number, rating: string): string {
  return `https://www.gravatar.com/avatar/${md5(
    email.trim().toLowerCase()
  )}?s=${size}&r=${rating}`;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  email,
  size = 48,
  rating = "g",
}) => {
  if (email) {
    // Gravatar
    const src = getGravatarUrl(email, size, rating);
    return (
      <img
        src={src}
        alt={name || email}
        width={size}
        height={size}
        style={{ borderRadius: "50%", objectFit: "cover", background: "#eee" }}
      />
    );
  }
  if (name) {
    const initials = getInitials(name);
    const bg = stringToColor(name);
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: bg,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: size * 0.45,
          userSelect: "none",
        }}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }
  // Default fallback
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#ccc",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.45,
        userSelect: "none",
      }}
      aria-label="avatar"
    >
      ?
    </div>
  );
};
