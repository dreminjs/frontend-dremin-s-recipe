import { createSlice } from "@reduxjs/toolkit";

interface IComponent {
  name: string;
  isVisible: boolean;
  id: string;
}

interface IInitialState {
  steps: IComponent[];
  ingredients: IComponent[];
}

const initialState: IInitialState = {
  steps: [],
  ingredients: [],
};

export const recipeComponentsSlice = createSlice({
  name: "recipeComponentsSlice",
  initialState,
  reducers: {
    addStep: (state, { payload }) => {
      state.steps = [...state.steps, payload];
    },
    addIngredient: (state, { payload }) => {
      state.ingredients = [...state.ingredients, payload];
    },
    removeStep: (state, { payload }) => {
      state.steps = state.steps.filter((el) => el.id !== payload);
    },
    removeIngredient: (state, { payload }) => {
      console.log(payload);

      state.ingredients = state.ingredients.filter((el) => el.id !== payload);
    },
    editStep: (state, { payload }) => {
      const componentIdx = state.steps.findIndex((el) => el.id === payload.id);

      state.steps[componentIdx].name = payload.name;
    },
    editIngredient: (state, { payload }) => {
      const componentIdx = state.ingredients.findIndex(
        (el) => el.id === payload.id
      );

      state.ingredients[componentIdx].name = payload.name;
    },
    showIngredientInput: (state, { payload }) => {
      const componentIdx = state.ingredients.findIndex(
        (el) => el.id === payload
      );

      state.ingredients[componentIdx].isVisible =
        !state.ingredients[componentIdx]?.isVisible;
    },
    hideIngredientInput: (state, { payload }) => {
      const componentIdx = state.ingredients.findIndex(
        (el) => el.id === payload.id
      );
      state.ingredients[componentIdx].isVisible = false;
      state.ingredients[componentIdx].name = payload.name;
    },
    showStepInput: (state, { payload }) => {
      const componentIdx = state.steps.findIndex((el) => el.id === payload);

      state.steps[componentIdx].isVisible = true;
    },
    hideStepInput: (state, { payload }) => {
      const componentIdx = state.steps.findIndex((el) => el.id === payload.id);

      console.log(payload);

      state.steps[componentIdx].isVisible = false;
      state.steps[componentIdx].name = payload.name;
    },
    clearRecipeComponents: (state) => {
      state.ingredients = [];
      state.steps = [];
    },
  },
});

export const {
  removeIngredient,
  removeStep,
  addIngredient,
  addStep,
  editIngredient,
  editStep,
  showIngredientInput,
  hideIngredientInput,
  hideStepInput,
  showStepInput,
  clearRecipeComponents,
} = recipeComponentsSlice.actions;
