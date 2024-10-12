import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Action
export const fetchSingleCategories = createAsyncThunk("fetchSingleCategories", async (idz) => {
    const {id} = idz;
  const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/category/getCategory/${id}`);
  return response.json();
});

const SingleCategoriesSlice = createSlice({
  name: "Singlecategory",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSingleCategories.rejected, (state, action) => {
      console.log("Error...", action.payload);
      state.isError = true;
    });
  },
});

export default SingleCategoriesSlice.reducer;
