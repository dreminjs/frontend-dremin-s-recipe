import { ModalLayout, useAppDispatch, useAppSelector } from "@/shared";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";

import { useState } from "react";
import { RecipeComponentTab } from "@/features/recipeComponents";
import {
  addIngredient,
  addStep,
  hideIngredientInput,
  hideStepInput,
  removeIngredient,
  removeStep,
  showIngredientInput,
  showStepInput,
} from "../../Recipe/model/recipeComponentsSlice";
export const RecipeComponentsModal = ({
  isOpen,
  onCloseModal,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  const [tab, setTab] = useState("1");

  const [newStepName, setNewStepName] = useState("");

  const [newIngredientName, setNewIngredientName] = useState("");

  const handleChangeTab = (_: any, tab: string) => setTab(tab);

  const dispatch = useAppDispatch();

  const handleAddStep = (name: string) =>
    dispatch(addStep({ name, id: Date.now().toString(), isVisible: false }));

  const handleAddIngredient = (name: string) =>
    dispatch(
      addIngredient({ name, id: Date.now().toString(), isVisible: false })
    );

  const handleChangeIngredientInputValue = (e: any) =>
    setNewIngredientName(e.target.value);

  const handleChangeStepInputValue = (e: any) => setNewStepName(e.target.value);

  const handleShowIngredientInput = (e: any) => {
    dispatch(showIngredientInput(e.target.id));
    setNewIngredientName(e.target.name);
  };

  const handleShowStepInput = (e: any) => {
    dispatch(showStepInput(e.target.id));
    setNewStepName(e.target.name);
  };

  const handleHideIngredientInput = (e: any) => {
    dispatch(hideIngredientInput({ name: newIngredientName, id: e.target.id }));
    setNewIngredientName("");
  };
  const handleHideStepInput = (e: any) => {
    dispatch(hideStepInput({ name: newStepName, id: e.target.id }));
    setNewStepName("");
  };

  const handleRemoveIngredient = (e: any) => {
    dispatch(removeIngredient(e.target.id));
  };

  const handleRemoveStep = (e: any) => {
    dispatch(removeStep(e.target.id));
  };

  const { steps, ingredients } = useAppSelector(
    (state) => state.recipeComponentsSlice
  );

  return (
    <ModalLayout isOpen={isOpen} onCloseModal={onCloseModal}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tab}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Ингредиенты" value="1" />
              <Tab label="Шаги" value="2" />
            </TabList>
          </Box>
          <RecipeComponentTab
            onRemoveComponent={handleRemoveIngredient}
            onHideEditInput={handleHideIngredientInput}
            onChangeComponentInputValue={handleChangeIngredientInputValue}
            onShowComponentInput={handleShowIngredientInput}
            recipeComponents={ingredients}
            addComponent={handleAddIngredient}
            tabNumber="1"
          />
          <RecipeComponentTab
            onRemoveComponent={handleRemoveStep}
            onHideEditInput={handleHideStepInput}
            onChangeComponentInputValue={handleChangeStepInputValue}
            onShowComponentInput={handleShowStepInput}
            recipeComponents={steps}
            addComponent={handleAddStep}
            tabNumber="2"
          />
        </TabContext>
      </Box>
    </ModalLayout>
  );
};
