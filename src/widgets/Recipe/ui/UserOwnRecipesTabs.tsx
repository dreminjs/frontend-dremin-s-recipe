import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { UsersRecipesTab } from "@/features/recipe";
import {
  useGetLikedRecipesQuery,
  useGetOwnRecipesQuery,
  useDeleteRecipeMutation,
} from "@/shared";
import { RecipeItem, UserOwnRecipeItem } from "@/entities/Recipes";
import { useDebounce } from "@uidotdev/usehooks";

export const UsersOwnRecipeTabs = ({}: {}) => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (_: any, tab: string) => {
    setTab(tab);
  };
  const [pageCheckedRecipes, setPageCheckedRecipes] = useState(1);
  const [pagePendingRecipes, setPagePendingRecipes] = useState(1);
  const [pageLikedRecipes, setPageLikedRecipes] = useState(1);

  const [inputValueCheckedRecipes, setInputValueCheckedRecipes] = useState("");
  const [inputValuePendingRecipes, setInputValuePendingRecipes] = useState("");
  const [inputValueLikedRecipe, setInputValueLikedRecipe] = useState("");

  const inputValueDebouncedCheckedRecipes = useDebounce(
    inputValueCheckedRecipes,
    300
  );

  const inputValueDebouncedPendingRecipes = useDebounce(
    inputValuePendingRecipes,
    300
  );

  const inputValueDebouncedLikedRecipes = useDebounce(
    inputValueLikedRecipe,
    300
  );

  const handleChangeInputValue = (fn: Function) => (e: any) =>
    fn(e.target.value);

  const handleChangePage = (fn: Function) => (_: any, page: number) => fn(page);

  const {
    data: likedRecipes,
    isLoading: likedRecipesIsLoading,
    isSuccess: likedRecipesIsSuccess,
    isError: likedRecipesIsError,
    refetch: likedRecipesRefetch,
  } = useGetLikedRecipesQuery({
    page: pageLikedRecipes,
    search: inputValueDebouncedCheckedRecipes,
  });

  const {
    data: checkedRecipes,
    isLoading: checkedRecipesIsLoading,
    isSuccess: checkedRecipesIsSuccess,
    isError: checkedRecipesIsError,
    refetch: refetchCheckedRecipes,
  } = useGetOwnRecipesQuery({
    page: pageCheckedRecipes,
    search: inputValueDebouncedPendingRecipes,
    isRejected: false,
    isChecked: true,
  });

  const {
    data: pendingRecipes,
    isLoading: pendingRecipesIsLoading,
    isSuccess: pendingRecipesIsSuccess,
    isError: pendingRecipesIsError,
    refetch: refetchPendingRecipes,
  } = useGetOwnRecipesQuery({
    page: pagePendingRecipes,
    search: inputValueDebouncedLikedRecipes,
    isRejected: false,
    isChecked: false,
  });

  const [deleteRecipe, { isSuccess: deletingRecipeIsSuccess }] =
    useDeleteRecipeMutation();

  useEffect(() => {
    refetchCheckedRecipes();
    refetchPendingRecipes();
    likedRecipesRefetch();
  }, [deletingRecipeIsSuccess]);

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
          <Tab label="готовые рецепты" value={"1"} />
          <Tab label="рецепты в ожидании" value={"2"} />
          <Tab label="понравившиеся рецепты" value={"3"} />
        </TabList>
      </Box>

      <UsersRecipesTab
        isError={checkedRecipesIsError}
        isLoading={checkedRecipesIsLoading}
        isSuccess={checkedRecipesIsSuccess}
        currentPage={pageCheckedRecipes}
        count={checkedRecipes?.count}
        tabNumber={"1"}
        onChangeInputValue={handleChangeInputValue(setInputValueCheckedRecipes)}
        onChangePage={handleChangePage(setPageCheckedRecipes)}
        inputValue={inputValueCheckedRecipes}
      >
        {checkedRecipes?.recipes?.map((el: any) => (
          <UserOwnRecipeItem
            onDeleteRecipe={() => deleteRecipe(el.id)}
            key={el.id}
            title={el.title}
            description={el.description}
            imgName={el.img}
            username={el.author.username}
            recipeId={el.id}
            authorId={el.authorId}
            isChecked={el.isChecked}
            isRejected={el.isRejected}
          />
        ))}
      </UsersRecipesTab>
      <UsersRecipesTab
        isError={pendingRecipesIsError}
        isLoading={pendingRecipesIsLoading}
        isSuccess={pendingRecipesIsSuccess}
        currentPage={pagePendingRecipes}
        count={pendingRecipes?.count}
        tabNumber={"2"}
        onChangeInputValue={handleChangeInputValue(setInputValuePendingRecipes)}
        onChangePage={handleChangePage(setPagePendingRecipes)}
        inputValue={inputValuePendingRecipes}
      >
        {pendingRecipes?.recipes?.map((el: any) => (
          <UserOwnRecipeItem
            onDeleteRecipe={() => deleteRecipe(el.id)}
            key={el.id}
            title={el.title}
            description={el.description}
            imgName={el.img}
            username={el?.author?.username}
            recipeId={el.id}
            authorId={el.authorId}
            isChecked={el.isChecked}
            isRejected={el.isRejected}
          />
        ))}
      </UsersRecipesTab>
      <UsersRecipesTab
        isError={likedRecipesIsError}
        isLoading={likedRecipesIsLoading}
        isSuccess={likedRecipesIsSuccess}
        currentPage={pageLikedRecipes}
        count={likedRecipes?.count}
        tabNumber={"3"}
        onChangeInputValue={handleChangeInputValue(setInputValueLikedRecipe)}
        onChangePage={handleChangePage(setPageLikedRecipes)}
        inputValue={inputValueLikedRecipe}
      >
        {likedRecipes?.recipes?.map((el: any) => (
          <RecipeItem
            key={el.id}
            title={el.title}
            description={el?.description}
            imgName={el.img}
            username={el?.author?.username}
            recipeId={el.id}
            authorId={el.authorId}
            isChecked={el.isChecked}
            isRejected={el.isRejected}
          />
        ))}
      </UsersRecipesTab>
    </TabContext>
  );
};
