import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

export default function HomeView() {
  const { data } = useContext(AppContext);
  return (
    <>
      <h2 className="List">
        <strong> Books List:</strong>
      </h2>
      <section className="Container-books">
        {data.results.map((book) => {
          return (
            <div className="Books-container">
              <li key={book.id}>
                <h1 className="Title-book"> Title: {book.title}</h1>
                <img
                  className="Book-img"
                  src={book.formats["image/jpeg"]}
                  alt="Book"
                />
                <p id="Authorp">
                  Author: {""}
                  {book.authors.map((author) => author.name.replace(",", " "))}
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
