import clsx from "clsx";
import Link from "next/link";
import React, { FunctionComponent, PropsWithChildren } from "react";

export type NavBarLinkProps = PropsWithChildren<{
  href: string;
  isActive: boolean;
}>;

export const NavBarLink: FunctionComponent<NavBarLinkProps> = ({
  children,
  href,
  isActive,
}) => {
  return (
    <Link href={href} passHref>
      <a className={clsx(isActive && "underline", "hover:underline")}>
        {children}
      </a>
    </Link>
  );
};

export default NavBarLink;
