import * as React from "react";
import { Recipes } from "@/widgets/Recipe";
import { useState } from "react";

import { RecipeCharacteristicsModal } from "@/widgets/Characteristics";
import {
  addHolidayForFilter,
  addNationalCuisineForFilter,
  addTypeForFilter,
  useAppDispatch,
  useAppSelector,
  useGetHolidaysQuery,
  useGetNationalCuisinesQuery,
  useGetTypesQuery,
  useGetRecipesQuery,
} from "@/shared";
import { RecipeItem } from "@/entities/Recipes";
import { SelectChangeEvent } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
export const RecipesPage = () => {
  const [inputValue, setInputValue] = useState("");

  const inputValueDebounced = useDebounce(inputValue, 300);

  const [page, setPage] = useState(1);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

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

  const [label, setTab] = useState("none");

  const handleChangeLabel = (e: SelectChangeEvent<string>) =>
    setTab(e.target.value);

  const { data, isLoading, isError, isSuccess, refetch } = useGetRecipesQuery({
    page,
    search: inputValueDebounced,
    searchParams: characteristicsSearchParams.toString(),
    orderBy: label,
    isChecked: true,
  });
  React.useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <RecipeCharacteristicsModal
        onAddHoliday={handleAddHoliday}
        onAddNationalCuisine={handleAddNationalCuisine}
        onAddType={handleAddType}
        isOpen={isFilterModalVisible}
        onCloseModal={handleCloseFilterModal}
      />

      <div className="min-h-screen flex flex-col items-center">
        <Recipes
          width="w-1/2"
          label={label}
          onChangeInputValue={handleChangeInputValue}
          onChangePage={handleChangePage}
          onChangeLabel={handleChangeLabel}
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
            <RecipeItem
              title={el.title}
              recipeId={el.id}
              authorId={el.authorId}
              username={el?.author?.username}
              description={el.description}
              key={idx}
              imgName={el.img}
            />
          ))}
        </Recipes>
      </div>
    </>
  );
};
