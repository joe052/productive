import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";

/**Configure store */
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;