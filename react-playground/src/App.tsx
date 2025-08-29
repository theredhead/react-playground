import { LiquidGlassGallery } from "./components/LiquidGlassGallery";
import { SW_CHARACTER_DATA } from "./data/sw-character-data";

import "./App.scss";
// import AddressBookDemo from "./AddressBookDemo";

export const App = () => {
  return (
    <>
      {/* <AddressBookDemo /> */}
      <LiquidGlassGallery data={SW_CHARACTER_DATA} />
    </>
  );
};
