import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./BookForm.css";
import { useDispatch } from "react-redux";
import { addBook } from "../../store/slices/bookSlice";
import { toast } from "react-toastify";
import books from "../../data/books.json";

const BookForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    const randomBook = {
      ...books[randomIndex],
      source: "Рандом",
      isFavorite: false,
      id: crypto.randomUUID(),
    };
    dispatch(addBook(randomBook));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      source: "Ручной",
      isFavorite: false,
      id: crypto.randomUUID(),
    };
    if (!title.trim().length && !author.trim().length) {
      toast("Please whrite somthing!");
      return;
    }
    dispatch(addBook(newBook));
    setTitle("");
    setAuthor("");
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>

        <button type="button">
          {false ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
