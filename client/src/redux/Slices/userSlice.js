import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Thunk to fetch user data
export const fetchUserData = createAsyncThunk("fetchUserData", async (idz) => {
  const { id } = idz;
  console.log("issss", id);

  const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/authentication/getadmin/${id}`);
  console.log("heppening", response);

  return response.json();
});

const userDataSlice = createSlice({
  name: "Singleuser",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    loginUser: (state) => {
      state.loginTime = Date.now();
    },
    logoutUser: (state) => {
      state.data = null;
    },
    setRoleUser: (state, action) => {
      state.role = action.payload;
    },
    clearPersistedUser: (state) => {
      state.isLoading = false;
      state.data = null;
      state.isError = false;
      storage.removeItem('persist:singleUser'); // Clears the persisted user data from storage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("Error...", action.payload);
      state.isError = true;
    });
  },
});

export const { loginUser, logoutUser, setRoleUser, clearPersistedUser } = userDataSlice.actions;

export default userDataSlice.reducer;
