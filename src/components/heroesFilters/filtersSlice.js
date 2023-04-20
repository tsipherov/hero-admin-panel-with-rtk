import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

export const fetchFilters = createAsyncThunk("@@filters/fetchFilters", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/filters");
});

const filtersSlice = createSlice({
  name: "@@filters",
  initialState: {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
  },
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = "idle";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      });
  },
});

export const { activeFilterChanged } = filtersSlice.actions;

export default filtersSlice.reducer;
