import React, { FunctionComponent, PropsWithChildren } from "react";

export type MainProps = PropsWithChildren<{
  className?: string;
}>;

const Main: FunctionComponent<MainProps> = ({ children, className }) => {
  return (
    <main className={className}>
      <div className="flex flex-col gap-4 m-4">{children}</div>
    </main>
  );
};

export default Main;
