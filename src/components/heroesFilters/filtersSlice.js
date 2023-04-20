import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter({
  selectId: (filter) => filter.name,
});

export const fetchFilters = createAsyncThunk("@@filters/fetchFilters", () => {
  const { request } = useHttp();
  return request("http://localhost:3001/filters");
});

const filtersSlice = createSlice({
  name: "@@filters",
  initialState: filtersAdapter.getInitialState({
    filtersLoadingStatus: "idle",
    activeFilter: "all",
  }),
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
        filtersAdapter.setAll(state, action.payload);
        // state.filters = action.payload;
        state.filtersLoadingStatus = "idle";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      });
  },
});

export const { activeFilterChanged } = filtersSlice.actions;
export const { selectAll } = filtersAdapter.getSelectors(
  (state) => state.filters
);

export default filtersSlice.reducer;
