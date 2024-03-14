import { ReactNode } from "react";

export const LayoutContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-3/4">{children}</div>;
};
