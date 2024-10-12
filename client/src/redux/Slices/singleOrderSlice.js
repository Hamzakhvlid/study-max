import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Action
export const fetchSingleOrder = createAsyncThunk("fetchSingleOrder", async (idz) => {
    const {id} = idz;
  const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/order/getorder/${id}`);
  return response.json();
});

const SingleOrderSlice = createSlice({
  name: "singleOrder",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSingleOrder.rejected, (state, action) => {
      console.log("Error...", action.payload);
      state.isError = true;
    });
  },
});

export default SingleOrderSlice.reducer;
