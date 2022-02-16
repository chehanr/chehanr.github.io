import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";

import NavBarLink from "./NavBarLink";

export const NavBar: FunctionComponent = () => {
  const router = useRouter();

  return (
    <nav className="flex flex-row flex-wrap gap-2 md:flex-col md:gap-0">
      <NavBarLink href="/" isActive={["/", ""].includes(router.pathname)}>
        About
      </NavBarLink>
      <NavBarLink href="/resume" isActive={router.pathname === "/resume"}>
        Resume
      </NavBarLink>
      <NavBarLink href="/posts" isActive={router.pathname === "/posts"}>
        Posts
      </NavBarLink>
    </nav>
  );
};

export default NavBar;
