import TabPanel from "@mui/lab/TabPanel";
import { Pagination } from "@mui/material";
import { ReactNode } from "react";

export const CharacteristicsList = ({
  children,
  onChangePage,
  count,
  onChangeInputValue,
  isError,
  isSuccess,
  isLoading,
}: {
  children: ReactNode;
  count?: number;
  onChangePage?: (_: any, tab: number) => void;
  onChangeInputValue?: any;
  isError?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
}) => {
  return (
    <div>
      {typeof count === "number" && (
        <input
          type="text"
          onChange={onChangeInputValue}
          className="mx-auto w-1/3 block mb-5 outline-none border-b-2"
          placeholder="поиск типа"
        />
      )}
      <ul className="text-center h-[250px]">
        {typeof count === "number" && count === 0 && <p>Пусто!</p>}
        {children}
        {isLoading && <li>Loading...</li>}
        {isError && <li>Error!</li>}
      </ul>
      {typeof count === "number" && (
        <div className="flex justify-center mt-12">
          <Pagination count={count} onChange={onChangePage} />
        </div>
      )}
    </div>
  );
};
