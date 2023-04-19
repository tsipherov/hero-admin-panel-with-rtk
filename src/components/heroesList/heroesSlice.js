import { createSlice } from "@reduxjs/toolkit";

const heroesSlice = createSlice({
  name: "@@heroes",
  initialState: {
    heroes: [],
    heroesLoadingStatus: "idle",
  },
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted,
} = heroesSlice.actions;

export default heroesSlice.reducer;
