import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.book.push(action.payload);
    },
    pickFavoriteBook: (state, action) => {
      state.book = state.book.map((item) => 
        item.id === action.payload ? { ...item, isFavorite: !item.isFavorite } : item
      );
    },
    deleteBook: (state, action) => {
      state.book = state.book.filter((item) => {
        if (item.id !== action.payload) {
          return { ...item };
        }
      });
    },
  },
});

export const { addBook, pickFavoriteBook, deleteBook } = bookSlice.actions;
