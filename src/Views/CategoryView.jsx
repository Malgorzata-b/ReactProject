import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryView() {
  const { categoryTopic } = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response_category = await fetch(
          `https://gutendex.com/books/?topic=${categoryTopic}`
        );
        if (!response_category.ok) {
          throw new Error(
            `Failed to fetch books for category: ${categoryTopic}`
          );
        }

        const data_category = await response_category.json();

        console.log(data_category.results);
        console.log("Category Topic:", categoryTopic);

        setBooks(data_category.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryTopic]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Link className="link--link2" to={`/`}>
        HomePage
      </Link>

      <h2 className="List">
        <strong> Book List:</strong>
      </h2>
      <section className="Container-books">
        {books.map((book) => {
          return (
            <div className="Books-container">
              <li>
                <h1 className="Title-book"> Title: {book.title}</h1>
                <img
                  className="Book-img"
                  src={book.formats["image/jpeg"]}
                  alt="Book"
                />
                <p className="Category-Name">
                  <strong>Category:</strong>{" "}
                  {book.bookshelves.map((bookshel) =>
                    bookshel.replace("Browsing:", " ")
                  )}
                </p>
                <Link className="link--link2" to={`/cart/${book.id}`}>
                  More Details
                </Link>
              </li>
            </div>
          );
        })}
      </section>
    </>
  );
}
