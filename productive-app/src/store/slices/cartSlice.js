import { createSlice } from "@reduxjs/toolkit";

/**Define initial state */
const initialState = {
    cartItems: []
};

/**Create slice here */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
