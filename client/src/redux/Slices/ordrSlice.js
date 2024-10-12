import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchOrder = createAsyncThunk("fetchOrder", async (dateRange, { rejectWithValue }) => {
    try {
        const { startDate, endDate } = dateRange;
        const start = startDate ? new Date(startDate).toISOString() : null;
        const end = endDate ? new Date(endDate).toISOString() : null;
        const query = new URLSearchParams();
        if (start) query.append("startDate", start);
        if (end) query.append("endDate", end);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/order/getallorder?${query.toString()}`);
        if (!response.ok) {
            throw new Error("Failed to fetch messages");
        }
        return response.json();
    } catch (error) {
        return rejectWithValue(error.message);

    }
});

const OrderSlice = createSlice({
    name: "orders",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchOrder.rejected, (state, action) => {
            console.log("Error...", action.payload);
            state.isError = true;
        });
    },
});

export default OrderSlice.reducer;
