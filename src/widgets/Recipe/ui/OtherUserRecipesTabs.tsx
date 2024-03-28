import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { UsersRecipesTab } from "@/features/recipe";
import {
  useGetLikedRecipesQuery,
  useGetOwnRecipesQuery,
  useGetUserLikedRecipesQuery,
  useGetUserRecipesQuery,
} from "@/shared";
import { RecipeItem, UserOwnRecipeItem } from "@/entities/Recipes";
import { useDeleteRecipeMutation } from "@/shared";

export const OtherUserRecipesTabs = ({
  id,
}: {
  id: string | string[] | undefined;
}) => {
  const [tab, setTab] = useState("1");

  const handleChangeTab = (_: any, tab: string) => {
    setTab(tab);
  };
  const [pageRecipes, setPageRecipes] = useState(1);

  const [pageLikedRecipes, setPageLikedRecipes] = useState(1);

  const [inputValueRecipes, setInputValueRecipes] = useState("");

  const [inputValueLikedRecipe, setInputValueLikedRecipe] = useState("");

  const handleChangeInputValue = (fn: Function) => (e: any) =>
    fn(e.target.value);

  const handleChangePage = (fn: Function) => (_: any, page: number) => fn(page);

  const {
    data: likedRecipes,
    isLoading: likedRecipesIsLoading,
    isSuccess: likedRecipesIsSuccess,
    isError: likedRecipesIsError,
    refetch: likedRecipesRefetch,
  } = useGetUserLikedRecipesQuery(
    {
      page: pageLikedRecipes,
      search: inputValueLikedRecipe,
      id,
    },
    { skip: !Boolean(id) }
  );

  const {
    data: recipesData,
    isError: recipesIsError,
    isLoading: recipesIsLoading,
    isSuccess: recipesIsSuccess,
    refetch: refetchRecipes,
  } = useGetUserRecipesQuery(
    {
      page: pageRecipes,
      search: inputValueRecipes,
      id,
    },
    { skip: !Boolean(id) }
  );

  useEffect(() => {
    if (likedRecipesIsSuccess) {
      likedRecipesRefetch();
    }
    if (recipesIsSuccess) {
      refetchRecipes();
    }
  }, []);

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
          <Tab label="рецепты" value={"1"} />
          <Tab label="понравившиеся рецепты" value={"3"} />
        </TabList>
      </Box>

      <UsersRecipesTab
        isError={recipesIsError}
        isLoading={recipesIsLoading}
        isSuccess={recipesIsSuccess}
        currentPage={pageRecipes}
        count={recipesData?.count}
        tabNumber={"1"}
        onChangeInputValue={handleChangeInputValue(setInputValueRecipes)}
        onChangePage={handleChangePage(setPageRecipes)}
        inputValue={inputValueRecipes}
      >
        {recipesData?.recipes.map((el: any) => (
          <RecipeItem
            key={el.id}
            title={el.title}
            description={el.description}
            imgName={el.img}
            username={el.author.username}
            recipeId={el.id}
            authorId={el.authorId}
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
        {likedRecipes?.recipes.map((el: any) => (
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
