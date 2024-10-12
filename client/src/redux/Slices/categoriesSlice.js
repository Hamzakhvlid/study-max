import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/category/getCategories`);
  return response.json();
});

const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default CategoriesSlice.reducer;
