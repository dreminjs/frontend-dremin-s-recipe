import { Pagination } from "@mui/material";
import { ReactNode } from "react";

export const RecipeList = ({
  children,
  count,
  currentPage,
  onChangePage,
  inputValue,
}: {
  children: ReactNode;
  currentPage: number;
  inputValue: string;
  count: number;
  onChangePage: (_: any, page: number) => void;
}) => {
  return (
    <>
      <input defaultValue={inputValue} type="text" placeholder="поиск..." />
      <ul>{children}</ul>
      <div className="flex justify-center">
        <Pagination page={currentPage} count={count} onChange={onChangePage} />
      </div>
    </>
  );
};
