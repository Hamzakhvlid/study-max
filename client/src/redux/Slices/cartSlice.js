import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseUrl } from "../../Api/url";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const clearCartOnServer = createAsyncThunk(
  "cart/clearCartOnServer",
  async (_, { dispatch, getState }) => {
    try {
      await axios.delete(baseUrl + "cart/clearCart", { withCredentials: true }); // Adjust API endpoint if needed
      dispatch(cartSlice.actions.clearCart()); // Dispatch the local clearCart action
    } catch (error) {
      console.error("Error clearing cart on server:", error);
      throw error;
    }
  }
);
// Async Thunk for adding to cart (interacts with your server)
export const addToCartOnServer = createAsyncThunk(
  "cart/addToCartOnServer",
  async (newItem, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/cart/addItem`,
        newItem,
        {
          withCredentials: true,
        }
      );

      dispatch(fetchCartFromServer()); // Assuming server sends back the added item

      return 0;

      // 2. Dispatch the success action (using the data returned from the server)
    } catch (error) {
      // 3. Handle errors gracefully
      console.error("Error adding item to server:", error);
      return 1; // Re-throw to allow components to handle the rejected case
    }
  }
);

// Async Thunk for removing from cart
export const removeFromCartOnServer = createAsyncThunk(
  "cart/removeFromCartOnServer",
  async (props, { dispatch }) => {
    const color = encodeURIComponent(props.color);
    const type = encodeURIComponent(props.type);
    try {
      const response = await axios
        .delete(
          `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/cart/removeItem/${
            props.itemId
          }?color=${color}&type=${type}`,
          { withCredentials: true }
        )
        .then(() => {
          dispatch(fetchCartFromServer()); // Assuming server sends back the added item
        });
    } catch (error) {
      console.error("Error removing item from server:", error);
      throw error;
    }
  }
);

export const updateQuantityOnServer = createAsyncThunk(
  "cart/updateQuantityOnServer",
  async ({ props }, { dispatch, getState }) => {
    // Use itemId
    try {
      const response = await axios
        .put(
          baseUrl + `cart/updateQuantity`, // Use itemId
          {
            itemId: props.itemId,
            quantity: props.count,
            type: props.type,
            color: props.color,
          },

          { withCredentials: true }
        )
        .then(() => {
          dispatch(fetchCartFromServer());
        });
    } catch (error) {
      console.error("Error updating quantity on server:", error);
      throw error;
    }
  }
);
// Async Thunk for fetching the cart from the server on initial load or when needed
export const fetchCartFromServer = createAsyncThunk(
  "cart/fetchCartFromServer",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN_NAME}/api/cart/getCart`,
        { withCredentials: true }
      );
      return response.data; // This should be your cart data structure from the server
    } catch (error) {
      console.error("Error fetching cart from server:", error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {},
    removeItem(state, action) {
      const { itemId, quantity, size, color } = action.payload; // Destructure size and color
      const existingItem = state.items.find(
        (item) =>
          item.productId === itemId &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.productId !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    deleteItem(state, action) {
      const { id, quantity, size, color } = action.payload; // Destructure size and color
      const existingItemIndex = state.items.find(
        (item) =>
          item.productId === id && item.size === size && item.color === color
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        // Update total quantity and amount before removing the item
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;

        // Remove the entire item entry from the array
        state.items.splice(existingItemIndex, 1);
      }
    },

    updateQuantity(state, action) {
      const { id, quantity, size, color } = action.payload; // Destructure size and color
      const existingItem = state.items.find(
        (item) =>
          item.productId === id && item.size === size && item.color === color
      );

      if (existingItem && quantity > 0) {
        const difference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        state.totalAmount += existingItem.price * difference;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCartOnServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartOnServer.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addToCartOnServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Remove from Cart
      .addCase(removeFromCartOnServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCartOnServer.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(removeFromCartOnServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update Quantity
      .addCase(updateQuantityOnServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateQuantityOnServer.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateQuantityOnServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch Cart
      .addCase(fetchCartFromServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the cart state with the fetched data
        state.items = action.payload.items || [];
        state.totalQuantity = action.payload.totalQuantity || 0;
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(fetchCartFromServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }) // Clear Cart
      .addCase(clearCartOnServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCartOnServer.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Clear the cart in the Redux store
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
      })
      .addCase(clearCartOnServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ... your export (updated to use persistReducer if needed)

export const actions = {
  ...cartSlice.actions,
  addToCartOnServer,
  removeFromCartOnServer,
  updateQuantityOnServer,
  fetchCartFromServer,
  clearCartOnServer,
};

export default cartSlice.reducer;
