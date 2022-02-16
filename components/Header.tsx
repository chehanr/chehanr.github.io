import React, { FunctionComponent } from "react";

import ThemeSwitchButton from "./ThemeSwitchButton";

export type HeaderProps = {
  tagLine?: string;
};

export const Header: FunctionComponent<HeaderProps> = ({ tagLine }) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <h1 className="flex-grow font-bold text-lg md:flex-none">
        Chehan Ratnasiri
      </h1>
      <h2 className="font-light hidden md:block md:flex-grow">{tagLine}</h2>
      <ThemeSwitchButton />
    </div>
  );
};

export default Header;
