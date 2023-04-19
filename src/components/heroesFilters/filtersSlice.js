import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "@@filters",
  initialState: {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
  },
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = "loading";
    },
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = "idle";
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = "error";
    },
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = filtersSlice.actions;

export default filtersSlice.reducer;
