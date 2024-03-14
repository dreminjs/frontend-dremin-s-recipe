import { SelectButton } from "@/shared";
import Pagination from "@mui/material/Pagination";
import { ReactNode, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

export const Recipes = ({
  count,
  onChangePage,
  onChangeInputValue,
  inputValue,
  children,
  width,
  isSuccess,
  isError,
  onOpenFilterModal,
  isLoading,
  onOpenSortModal,
  currentPage,
}: {
  onChangePage: (_: any, page: number) => void;
  count: number;
  onChangeInputValue: (e: any) => void;
  onOpenFilterModal: () => void;
  onOpenSortModal: () => void;
  inputValue: string;
  width: "w-1/2" | "w-full";
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  children: ReactNode;
  currentPage: number;
}) => {
  return (
    <div className={`${width} mx-auto mb-12`}>
      <div className="mb-2 flex items-center gap-5 justify-center">
        <input
          className="border-b-2 w-1/3  outline-none"
          type="text"
          placeholder="search..."
          onChange={onChangeInputValue}
          defaultValue={inputValue}
        />
        <button onClick={onOpenFilterModal} className="border-2 py-2 px-5 ">
          фильтр
        </button>

        <button className="border-2 py-2 px-5" onClick={onOpenSortModal}>
          сорт
        </button>
      </div>
      <ul className="mb-2">
        {isSuccess && children}

        {isLoading && <li>Loading...</li>}
        {isError && <li>Ошибка!</li>}
      </ul>
      <div className="flex justify-center">
        <Pagination page={currentPage} count={count} onChange={onChangePage} />
      </div>
    </div>
  );
};
