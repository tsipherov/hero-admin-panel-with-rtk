import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const fetchHeroes = createAsyncThunk("@@heroes/fetchHeroes", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
  name: "@@heroes",
  initialState: {
    heroes: [],
    heroesLoadingStatus: "idle",
  },
  reducers: {
    // heroesFetching: (state) => {
    //   state.heroesLoadingStatus = "loading";
    // },
    // heroesFetched: (state, action) => {
    //   state.heroesLoadingStatus = "idle";
    //   state.heroes = action.payload;
    // },
    // heroesFetchingError: (state) => {
    //   state.heroesLoadingStatus = "error";
    // },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDeleted: (state, action) => {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      });
  },
});

export const {
  // heroesFetching,
  // heroesFetched,
  // heroesFetchingError,
  heroCreated,
  heroDeleted,
} = heroesSlice.actions;

export default heroesSlice.reducer;
