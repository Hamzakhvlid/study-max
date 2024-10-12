import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import categoriesReducer from "./Slices/categoriesSlice";
import productsReducer from "./Slices/productsSlice";
import SingleCategoriesReducer from "./Slices/singleCategorySlice";
import SingleProductReducer from "./Slices/singleProductSlice";
import SingleUserReducer from "./Slices/userSlice";
import OrderReducer from "./Slices/ordrSlice";
import CartReducer from "./Slices/cartSlice";
import SingleOrderReducer from "./Slices/singleOrderSlice";
import messageSlice from "./Slices/messageSlice";

const persistConfig = {
  key: "Singleuser",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, SingleUserReducer);
const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    Singlecategory: SingleCategoriesReducer,
    Singleproduct: SingleProductReducer,
    orders: OrderReducer,
    Singleuser: persistedUserReducer,
    cart: CartReducer,
    messages: messageSlice,
    singleOrder: SingleOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
