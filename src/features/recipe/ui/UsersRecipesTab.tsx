/* eslint-disable react/jsx-no-undef */
import { RecipeItem, RecipeList } from "@/entities/Recipes";
import { Recipes } from "@/widgets/Recipe/ui/Recipes";
import { Pagination, TabPanel } from "@mui/lab";
import { ReactNode, useState } from "react";

export const UsersRecipesTab = ({
  tabNumber,
  isError,
  isSuccess,
  isLoading,
  count,
  children,
  inputValue,
  currentPage,
  onChangeInputValue,
  onChangePage,
}: {
  tabNumber: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  count: number;
  inputValue: string;
  currentPage: number;
  children: ReactNode;
  onChangeInputValue: (e: any) => void;
  onChangePage: (_: any, page: number) => void;
}) => {
  return (
    <TabPanel className="w-full mx-auto" value={tabNumber}>
      <input
        className="outline-none border-b-2 block mx-auto mb-2"
        defaultValue={inputValue}
        onChange={onChangeInputValue}
        type="text"
        placeholder="поиск..."
      />
      <ul className="flex flex-col items-center">
        {isLoading && <li>Loading...</li>} {isError && <li>Error!</li>}
        {children}
      </ul>
      <div className="flex justify-center">
        <Pagination page={currentPage} count={count} onChange={onChangePage} />
      </div>
    </TabPanel>
  );
};
