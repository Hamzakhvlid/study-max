import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (dateRange, { rejectWithValue }) => {
    try {
      const { startDate, endDate } = dateRange;
      // Convert to ISO strings if valid dates are provided
      const start = startDate ? new Date(startDate).toISOString() : null;
      const end = endDate ? new Date(endDate).toISOString() : null;
      const query = new URLSearchParams();
      if (start) query.append("startDate", start);
      if (end) query.append("endDate", end);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME
        }/api/contact/messages?${query.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload || "Error fetching messages";
    });
  },
});

export default messageSlice.reducer;
