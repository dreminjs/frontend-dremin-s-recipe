import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  types: any[];
  holidays: any[];
  nationalCuisines: any[];
}

const initialState: IInitialState = {
  types: [],
  holidays: [],
  nationalCuisines: [],
};

export const characteristicsSlice = createSlice({
  name: "characteristicSlice",
  initialState,
  reducers: {
    addTypeForFilter: (state, { payload }) => {
      if (!state.types.some((obj) => obj.name.includes(payload.name))) {
        state.types = [...state.types, payload];
        console.log(state.types);
      }
    },
    addNationalCuisineForFilter: (state, { payload }) => {
      if (
        !state.nationalCuisines.some((obj) => obj.name.includes(payload.name))
      ) {
        state.nationalCuisines = [...state.nationalCuisines, payload];
      }
    },
    addHolidayForFilter: (state, { payload }) => {
      if (!state.holidays.some((obj) => obj.name.includes(payload.name))) {
        state.holidays = [...state.holidays, payload];
      }
    },
    addTypeToRecipe: (state, { payload }) => {
      state.types = [payload];
    },
    addHolidayToRecipe: (state, { payload }) => {
      state.holidays = [payload];
    },
    addNationalCuisineToRecipe: (state, { payload }) => {
      state.nationalCuisines = [payload];
    },
    removeType: (state, { payload }) => {
      if (state.types.find((el) => el.id == payload)) {
        state.types = state.types.filter((el) => el.id === payload.id);
      }
    },
    removeNationalCuisine: (state, { payload }) => {
      if (state.nationalCuisines.find((el) => el.id === payload)) {
        state.nationalCuisines = state.nationalCuisines.filter(
          (el) => el.name === payload.name
        );
      }
    },
    removeHoliday: (state, { payload }) => {
      if (state.holidays.find((el) => el.id === payload)) {
        state.holidays = state.holidays.filter(
          (el) => el.name === payload.name
        );
      }
    },
    clearCharacteristics: (state) => {
      state.holidays = [];
      state.nationalCuisines = [];
      state.types = [];
    },
    setHoliday: (state, { payload }) => {
      state.holidays = [payload];
    },
    setNationalCuisine: (state, { payload }) => {
      state.nationalCuisines = [payload];
    },
    setType: (state, { payload }) => {
      state.types = [payload];
    },
  },
});

export const {
  addHolidayForFilter,
  addNationalCuisineForFilter,
  addTypeForFilter,
  addHolidayToRecipe,
  addNationalCuisineToRecipe,
  addTypeToRecipe,
  removeType,
  removeHoliday,
  removeNationalCuisine,
  clearCharacteristics,
} = characteristicsSlice.actions;
