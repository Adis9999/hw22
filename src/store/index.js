import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./slices/bookSlice";
import { filterSlice } from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
    filter: filterSlice.reducer,
  },
});
