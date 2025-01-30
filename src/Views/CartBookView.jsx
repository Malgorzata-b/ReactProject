import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { AppContext } from "../App";

export default function CartBookView() {
  const { cartID } = useParams();
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response_book = await fetch(
          `https://gutendex.com/books/${cartID}/`
        );

        if (!response_book.ok) {
          throw new Error(`Failed to fetch book with ID:${cartID}`);
        }
        const data_book = await response_book.json();
        setBook(data_book);
        console.log(data_book);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [cartID]);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="Book-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {book && book.title ? (
        <>
          <div className="Book-information-container">
            <div className="Book-info-cont">
              <h1 className="Title-book"> {book.title}</h1>
              <p className="Category-Name">
                <strong>Category:</strong>{" "}
                {book.bookshelves.map((bookshel) =>
                  bookshel.replace("Browsing:", " ")
                )}
              </p>
              <p>Language: {book.languages}</p>
              <img
                className="Book-img-cart"
                src={book.formats["image/jpeg"]}
                alt="Book"
              />
            </div>
            <div className="Information-Author">
              <p>Author:</p>
              <p>
                {book.authors.map((author) => {
                  return (
                    <>
                      {author.name.replace(",", " ")} ({author.birth_year} -{" "}
                      {author.death_year})
                    </>
                  );
                })}
              </p>
              <p className="Decription-Book"> {book.summaries}</p>
            </div>
          </div>
          <div className="link-container">
            <a
              className="Link-ebook"
              href={
                book.formats["text/plain; charset=utf-8"] ||
                book.formats["text/plain; charset=us-ascii"]
              }
            >
              Link to ebook.
            </a>
            <p>Number of downloads: {book.download_count}</p>
          </div>
          <div className="Button-addtoFav">
            <button className="Button-AddBook">Add to Favorites</button>
          </div>
        </>
      ) : (
        <p>Not found.</p>
      )}
    </div>
  );
}
