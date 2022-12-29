import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducer/userSlice";
import userMovieReducer from "./reducer/userMovie"
import userVoucherReducer from "./reducer/userVoucher"
import ratingMovieReducer from "./reducer/ratingMovie"
import listRatingReduder from "./reducer/listRating";
const store = configureStore({
  reducer: {
    user: userReducer,
    userMovie : userMovieReducer,
    userVoucher : userVoucherReducer,
    ratingMovie : ratingMovieReducer,
    listRating : listRatingReduder
  },
});
export default store;
