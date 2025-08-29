import { useState } from "react";
import { eraCategory, matchesQuery } from "./StarWarsCharacterCard/helpers";
import {
  StarWarsCharacterCard,
  type CardData,
} from "./StarWarsCharacterCard/StarWarsCharacterCard";
import "./LiquidGlassGallery.scss";

export interface GalleryProps {
  data: CardData[];
}

export function LiquidGlassGallery({ data }: GalleryProps) {
  const [q, setQ] = useState("");
  const eras = Array.from(new Set(data.map(eraCategory)));
  const [era, setEra] = useState<string>("All");

  const filtered = data
    .filter((d) => matchesQuery(d, q))
    .filter((d) => (era === "All" ? true : eraCategory(d) === era));
  const groups = filtered.reduce<Record<string, CardData[]>>((acc, d) => {
    const key = eraCategory(d);
    (acc[key] ||= []).push(d);
    return acc;
  }, {});
  const orderedGroups = Object.keys(groups).sort((a, b) => a.localeCompare(b));

  return (
    <div className="page">
      <div className="wrap">
        <header className="site">
          <div>
            <h1>Liquid Glass Cards — Star Wars</h1>
          </div>
          <div className="filters">
            <input
              className="search"
              placeholder="Search…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search characters"
            />
            <select
              className="select"
              value={era}
              onChange={(e) => setEra(e.target.value)}
              aria-label="Filter by era"
            >
              <option>All</option>
              {eras.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
        </header>
        {orderedGroups.map((group) => (
          <section key={group} className="era-section">
            <h2 className="era-title">{group}</h2>
            <div className="grid">
              {groups[group].map((d) => (
                <div className="col-4" key={d.title}>
                  <StarWarsCharacterCard data={d} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
