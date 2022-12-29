import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  userVoucher: [],
};

export const userVoucherSlice = createSlice({
  name: "userVoucher",
  initialState,
  reducers: {
    setuserVoucher: (state, action) => {
      state.userVoucher = action.payload;
    },
  },
});

export default userVoucherSlice.reducer;