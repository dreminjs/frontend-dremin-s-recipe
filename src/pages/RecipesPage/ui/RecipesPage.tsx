import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { Recipes } from "@/entities/Recipes";
import { useState } from "react";
import Image from "next/image";
import { useGetRecipesQuery } from "..";
import Link from "next/link";
import { RecipeCharacteristicsModal, RecipeSortModal } from "@/widgets/Recipe";
import {
  addHolidayForFilter,
  addNationalCuisineForFilter,
  addTypeForFilter,
  useAppDispatch,
  useAppSelector,
  useGetHolidaysQuery,
  useGetNationalCuisinesQuery,
  useGetTypesQuery,
} from "@/shared";
export { useGetRecipesQuery } from "../api/recipesApi";
export const RecipesPage = () => {
  const [inputValue, setInputValue] = useState("");

  const [page, setPage] = useState(1);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const characteristicsSearchParams = new URLSearchParams("");

  const { types, nationalCuisines, holidays } = useAppSelector(
    (state) => state.characteristicSlice
  );

  types.forEach((el) => console.log(el.id));

  types.forEach((el) => characteristicsSearchParams.append("typeId", el.id));

  nationalCuisines.forEach((el) =>
    characteristicsSearchParams.append("nationalCuisineId", el.id)
  );

  holidays.forEach((el) => {
    characteristicsSearchParams.append("holidayId", el.id);
  });

  const dispatch = useAppDispatch();

  const { data, isLoading, isError, isSuccess } = useGetRecipesQuery({
    page,
    search: inputValue,
    searchParams: characteristicsSearchParams.toString(),
  });

  const handleChangePage = (_: any, page: number) => {
    setPage(page);
  };

  const handleChangeInputValue = (e: any) => {
    setInputValue(e.target.value);

    setPage(1);
  };
  const handleOpenFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const handleOpenSortModal = () => {
    setIsSortModalVisible(true);
  };

  const handleCloseSortModal = () => {
    setIsSortModalVisible(false);
  };

  const handleAddType = (e: any) => {
    dispatch(addTypeForFilter({ id: e.target.id, name: e.target.innerHTML }));
  };

  const handleAddHoliday = (e: any) => {
    dispatch(
      addHolidayForFilter({ id: e.target.id, name: e.target.innerHTML })
    );
  };

  const handleAddNationalCuisine = (e: any) => {
    dispatch(
      addNationalCuisineForFilter({
        id: e.target.id,
        name: e.target.innerHTML,
      })
    );
  };

  return (
    <>
      <RecipeCharacteristicsModal
        onAddHoliday={handleAddHoliday}
        onAddNationalCuisine={handleAddNationalCuisine}
        onAddType={handleAddType}
        isOpen={isFilterModalVisible}
        onCloseModal={handleCloseFilterModal}
      />
      <RecipeSortModal
        onCloseModal={handleCloseSortModal}
        isOpen={isSortModalVisible}
      />
      <div className="min-h-screen flex flex-col items-center">
        <Recipes
          width="w-1/2"
          onOpenSortModal={handleOpenSortModal}
          onChangeInputValue={handleChangeInputValue}
          onChangePage={handleChangePage}
          onOpenFilterModal={handleOpenFilterModal}
          count={data?.count}
          currentPage={page}
          inputValue={inputValue}
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
        >
          {data?.recipes.length === 0 && (
            <li className="text-center">пусто!</li>
          )}
          {data?.recipes.map((el: any, idx: number) => (
            <li className="mb-5 border-2 p-2 w-full" key={idx}>
              <Link
                className="flex items-center gap-2"
                href={`recipes/${el.id}`}
              >
                <Image
                  height={200}
                  width={150}
                  className="object-cover h-48 w-52"
                  src={`http://localhost:3000/${el.img}`}
                  alt="alt"
                />
                <div>
                  <p className="text-xl">{el.title}</p>
                  <p className="mb-2">{el.description.substring(0, 100)}</p>
                  <Link href={`profile/el.authorId`}>
                    Автор : {el.author.username}
                  </Link>
                </div>
              </Link>
            </li>
          ))}
        </Recipes>
      </div>
    </>
  );
};
