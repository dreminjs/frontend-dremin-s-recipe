import { ReactNode } from "react";

export const LayoutContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto min-[320px]:px-5 sm:w-11/12 lg:w-3/4">
      {children}
    </div>
  );
};
