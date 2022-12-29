import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  ratingMovie: [],
};

export const ratingMovieSlice = createSlice({
  name: "ratingMovie",
  initialState,
  reducers: {
    setratingMovie: (state, action) => {
      state.ratingMovie = action.payload;
    },
  },
});

export default ratingMovieSlice.reducer;