  import { createSlice } from "@reduxjs/toolkit";

  export const filterSlice = createSlice({
    name: "filter",
    initialState: {
      filterByTitle: "",
      filterByAuthor: "",
      favoriteBooks: false,
    },
    reducers: {
      titleValueHandler: (state, action) => {
        state.filterByTitle = action.payload;
      },
      authorValueHandler: (state, action) => {
        state.filterByAuthor = action.payload;
      },
      onlyFavorites: (state) => {
        state.favoriteBooks = !state.favoriteBooks;
      },
      resetFilter: (state) => {
        state.filterByTitle = "";
        state.filterByAuthor = "";
        state.favoriteBooks = false;
      },
    },
  });

  export const {
    titleValueHandler,
    authorValueHandler,
    onlyFavorites,
    resetFilter,
  } = filterSlice.actions;
