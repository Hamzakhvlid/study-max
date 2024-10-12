import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


// Action
export const fetchSingleProduct = createAsyncThunk("fetchSingleProduct", async (idz) => {
    const { id } = idz;
    const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/product/product/${id}`);
    return response.json();
});

const SingleProductSlice = createSlice({
    name: "Singleproduct",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProduct.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            console.log("Error...", action.payload);
            state.isError = true;
        });
    },
});

export default SingleProductSlice.reducer;
