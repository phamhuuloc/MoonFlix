import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
    listRating: [],
};

export const listRatingSlice = createSlice({
  name: "listRating",
  initialState,
  reducers: {
    setlistRating: (state, action) => {
      state.listRating = action.payload;
    },
  },
});

export default listRatingSlice.reducer;