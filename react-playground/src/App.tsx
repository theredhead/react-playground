import { LiquidGlassGallery } from "./components/liquidglassgallery.component";
import { SW_CHARACTER_DATA } from "./data/sw-character-data";

import "./App.scss";

export const App = () => {
  return (
    <>
      <LiquidGlassGallery data={SW_CHARACTER_DATA} />
    </>
  );
};
