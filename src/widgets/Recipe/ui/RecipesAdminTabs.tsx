import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { UsersRecipesTab } from "@/features/recipe";
import {
  useCheckRecipeMutation,
  useDeleteRecipeMutation,
  useGetRecipesQuery,
  useRejectRecipeMutation,
} from "@/shared";
import { RecipesAdminItem } from "@/entities/Recipes";
import { useDebounce } from "@uidotdev/usehooks";

export const RecipesAdminTabs = () => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (_: any, tab: string) => {
    setTab(tab);
  };
  const [pageCheckedRecipes, setPageCheckedRecipes] = useState(1);
  const [pagePendingRecipes, setPagePendingRecipes] = useState(1);
  const [pageRejectedRecipes, setPageRejectedRecipes] = useState(1);

  const [inputValueCheckedRecipes, setInputValueCheckedRecipes] = useState("");
  const [inputValuePendingRecipes, setInputValuePendingRecipes] = useState("");
  const [inputValueRejectedRecipe, setInputValueRejectedRecipe] = useState("");

  const inputValueDebouncedCheckedRecipes = useDebounce(
    inputValueCheckedRecipes,
    300
  );

  const inputValueDebouncedPendingRecipes = useDebounce(
    inputValuePendingRecipes,
    300
  );

  const inputValueDebouncedRejectedRecipes = useDebounce(
    inputValueRejectedRecipe,
    300
  );

  const handleChangeInputValue = (fn: Function) => (e: any) =>
    fn(e.target.value);

  const handleChangePage = (fn: Function) => (_: any, page: number) => fn(page);

  const [checkRecipe, { isLoading: checkingRecipeIsLoading }] =
    useCheckRecipeMutation();

  const [rejectRecipe, { isLoading: rejectingRecipeIsLoading }] =
    useRejectRecipeMutation();

  const [deleteRecipe, { isLoading: deletingRecipeIsLoading }] =
    useDeleteRecipeMutation();

  const {
    data: checkedRecipes,
    isLoading: checkedRecipesIsLoading,
    isSuccess: checkedRecipesIsSuccess,
    isError: checkedRecipesIsError,
    refetch: refetchCheckedRecipes,
  } = useGetRecipesQuery({
    page: pageCheckedRecipes,
    isChecked: true,
    search: inputValueDebouncedCheckedRecipes,
  });
  const {
    data: rejectedRecipes,
    isLoading: rejectedRecipesIsLoading,
    isSuccess: rejectedRecipesIsSuccess,
    isError: rejectedRecipesIsError,
    refetch: refetchRecjectedRecipes,
  } = useGetRecipesQuery({
    page: pageRejectedRecipes,
    isRejected: true,
    search: inputValueDebouncedPendingRecipes,
  });
  const {
    data: pendingRecipes,
    isLoading: pendingRecipesIsLoading,
    isSuccess: pendingRecipesIsSuccess,
    isError: pendingRecipesIsError,
    refetch: refetchPendingRecipes,
  } = useGetRecipesQuery({
    page: pagePendingRecipes,
    isRejected: false,
    isChecked: false,
    search: inputValueDebouncedRejectedRecipes,
  });

  useEffect(() => {
    refetchPendingRecipes();
    refetchRecjectedRecipes();
    refetchCheckedRecipes();
  }, [
    rejectingRecipeIsLoading,
    checkingRecipeIsLoading,
    deletingRecipeIsLoading,
  ]);

  return (
    <TabContext value={tab}>
      <Box
        sx={{
          borderBottom: 1,
          display: "flex",
          justifyContent: "center",
          borderColor: "divider",
          width: "100%",
        }}
      >
        <TabList
          variant="scrollable"
          scrollButtons="auto"
          sx={{ typography: "body1" }}
          onChange={handleChangeTab}
        >
          <Tab label="рецепты в ожидании" value={"1"} />
          <Tab label="откланенные рецепты" value={"2"} />
          <Tab label="готовые рецепты" value={"3"} />
        </TabList>
      </Box>
      <UsersRecipesTab
        tabNumber="1"
        onChangeInputValue={handleChangeInputValue(setInputValuePendingRecipes)}
        onChangePage={handleChangePage(setPagePendingRecipes)}
        count={pendingRecipes?.count}
        inputValue={inputValuePendingRecipes}
        currentPage={pagePendingRecipes}
        isError={pendingRecipesIsError}
        isLoading={pendingRecipesIsLoading}
        isSuccess={pendingRecipesIsSuccess}
      >
        {pendingRecipes?.recipes.map((el: any, idx: number) => (
          <RecipesAdminItem
            onDeleteRecipe={() => deleteRecipe(el.id)}
            key={idx}
            recipeId={el.id}
            imgName={el.img}
            authorId={el.authorId}
            username={el.author.username}
            title={el.title}
            description={el.description}
            onRejectRecipe={() => rejectRecipe(el.id)}
            onCheckRecipe={() => checkRecipe(el.id)}
            isChecked={el.isChecked}
            isRejected={el.isRejected}
          />
        ))}
      </UsersRecipesTab>
      <UsersRecipesTab
        onChangeInputValue={handleChangeInputValue(setInputValueRejectedRecipe)}
        onChangePage={handleChangePage(setPageRejectedRecipes)}
        tabNumber="2"
        isError={rejectedRecipesIsError}
        isLoading={rejectedRecipesIsLoading}
        isSuccess={rejectedRecipesIsSuccess}
        count={rejectedRecipes?.count}
        inputValue={inputValueRejectedRecipe}
        currentPage={pageRejectedRecipes}
      >
        {rejectedRecipes?.recipes.map((el: any, idx: number) => (
          <RecipesAdminItem
            onDeleteRecipe={() => deleteRecipe(el.id)}
            key={idx}
            recipeId={el.id}
            imgName={el.img}
            authorId={el.authorId}
            username={el.author.username}
            title={el.title}
            description={el.description}
            isChecked={el.isChecked}
            isRejected={el.isRejected}
            onRejectRecipe={() => rejectRecipe(el.id)}
            onCheckRecipe={() => checkRecipe(el.id)}
          />
        ))}
      </UsersRecipesTab>
      <UsersRecipesTab
        tabNumber="3"
        onChangeInputValue={handleChangeInputValue(setInputValueCheckedRecipes)}
        onChangePage={handleChangePage(setPageCheckedRecipes)}
        isError={checkedRecipesIsError}
        isLoading={checkedRecipesIsLoading}
        isSuccess={checkedRecipesIsSuccess}
        count={checkedRecipes?.count}
        inputValue={inputValueCheckedRecipes}
        currentPage={pageCheckedRecipes}
      >
        {checkedRecipes?.recipes.map((el: any, idx: number) => (
          <RecipesAdminItem
            onDeleteRecipe={() => deleteRecipe(el.id)}
            key={idx}
            recipeId={el.id}
            imgName={el.img}
            authorId={el.authorId}
            username={el.author.username}
            title={el.title}
            description={el.description}
            isChecked={el.isChecked}
            isRejected={el.isRejected}
            onRejectRecipe={() => rejectRecipe(el.id)}
            onCheckRecipe={() => checkRecipe(el.id)}
          />
        ))}
      </UsersRecipesTab>
    </TabContext>
  );
};
