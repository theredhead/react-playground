import type { CardData } from "./StarWarsCharacterCard";

export function eraCategory(d: CardData): string {
  const eraEntry = d.meta.find((m) => m.k.toLowerCase() === "era");
  if (!eraEntry) return "Various";
  const v = eraEntry.v;
  if (/clone wars/i.test(v)) return "Clone Wars";
  if (/galactic civil war/i.test(v)) return "Galactic Civil War";
  if (/republic/i.test(v) && !/new republic/i.test(v)) return "Republic";
  if (/new republic/i.test(v)) return "New Republic";
  if (/first order/i.test(v)) return "First Order";
  if (/empire/i.test(v)) return "Empire";
  if (/rebellion/i.test(v)) return "Rebellion";
  return "Various";
}

export function matchesQuery(d: CardData, q: string): boolean {
  if (!q) return true;
  const hay = [
    d.title,
    d.subtitle,
    ...d.chips,
    ...d.meta.map((m) => `${m.k} ${m.v}`),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q.toLowerCase());
}
