import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
const initialState = {
  userMovie: [],
};

export const userMovieSlice = createSlice({
  name: "userMovie",
  initialState,
  reducers: {
    setUserMovie: (state, action) => {
      state.userMovie = action.payload;
    },
  },
});

export default userMovieSlice.reducer;