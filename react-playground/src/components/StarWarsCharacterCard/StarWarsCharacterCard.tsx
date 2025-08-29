import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import type { CardHeaderProps } from "../Card/CardHeader";
import type { CardMetaInfoProps } from "../Card/CardMetaInfo";
import { ChipList } from "../ChipList/ChipList";
import "./StarWarsCharacterCard.scss";

export interface MetaKV {
  k: string;
  v: string;
}
export interface CardData {
  title: string;
  subtitle: string;
  chips: string[];
  meta: MetaKV[];
  accent: string;
  signal: number; // 0..1
  avatar: "saber" | "disc" | "buns";
}

export const StarWarsCharacterCard = ({ data }: { data: CardData }) => {
  const style = {
    ["--accent" as any]: data.accent,
    ["--signal" as any]: String(data.signal),
  };
  const header: CardHeaderProps = {
    avatar: <Avatar name={data.title} size={48} />,
    title: data.title,
    subtitle: data.subtitle,
  };
  const meta: CardMetaInfoProps = {
    meta: data.meta,
  };
  return (
    <Card
      style={style}
      header={header}
      chips={<ChipList chips={data.chips} />}
      meta={meta}
      footer={{
        children: (
          <>
            <div className="signal" title="signal" />
            <Button aria-label={`View dossier for ${data.title}`}>
              View dossier
            </Button>
          </>
        ),
      }}
    />
  );
};
