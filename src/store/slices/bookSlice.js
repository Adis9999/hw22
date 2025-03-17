import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";

export const fetchBook = createAsyncThunk(
  "book/getBooks",
  async (_, thunkApi) => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteBookThunk = createAsyncThunk(
  "book/deleteBook",
  async (id, thunkApi) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const toggleBook = createAsyncThunk(
  "book/toggle",
  async (id, thunkApi) => {
    const store = thunkApi.getState();
    const existingBook = store.book.book.find((item) => item.id === id);

    if (!existingBook) {
      return thunkApi.rejectWithValue("Book not found");
    }

    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ isFavorite: !existingBook.isFavorite }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle favorite status");
      }

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  book: [],
  isError: null,
  isSpinning: false,
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
        item.id === action.payload
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      );
    },
    deleteBook: (state, action) => {
      state.book = state.book.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isSpinning = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.book = action.payload;
      state.isSpinning = false;
      state.isError = null;
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.isError = action.payload;
      state.isSpinning = false;
    });

    builder.addCase(deleteBookThunk.pending, (state) => {
      state.isSpinning = true;
    });
    builder.addCase(deleteBookThunk.fulfilled, (state, action) => {
      state.book = state.book.filter((item) => item.id !== action.payload);
      state.isSpinning = false;
      state.isError = null;
    });
    builder.addCase(deleteBookThunk.rejected, (state, action) => {
      state.isError = action.payload;
      state.isSpinning = false;
    });

    builder.addCase(toggleBook.pending, (state) => {
      state.isSpinning = true;
    });
    builder.addCase(toggleBook.fulfilled, (state, action) => {
      state.book = state.book.map((item) =>
        item.id === action.payload
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      );
      state.isSpinning = false;
      state.isError = null;
    });
    builder.addCase(toggleBook.rejected, (state, action) => {
      state.isError = action.payload;
      state.isSpinning = false;
    });
  },
});

export const { addBook, pickFavoriteBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
