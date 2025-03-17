import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import "./BookList.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, pickFavoriteBook } from "../../store/slices/bookSlice";

const BookList = () => {
  const { book } = useSelector((state) => state.book);
  const { filterByTitle, filterByAuthor, favoriteBooks } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(pickFavoriteBook(id));
  };

  const filteredBooks = book.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(filterByTitle.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(filterByAuthor.toLowerCase());
    const matchesFavorite = favoriteBooks ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filteredBooks.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {highlightMatch(book.title, filterByTitle)} by{" "}
                <strong>{highlightMatch(book.author, filterByAuthor)}</strong> (
                {book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
