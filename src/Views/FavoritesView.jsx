import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const FavoritesData = () => {
    const FavoritesBooks = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(FavoritesBooks);
  };

  useEffect(() => {
    FavoritesData();
    window.addEventListener("storage", FavoritesData);

    return () => {
      window.removeEventListener("storage", FavoritesData);
    };
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((book) => book.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <div className="Favorites">
        <h1 className="FavoritesTitle">Favorites:</h1>
        <Link className="link--link2" to={`/`}>
          HomePage
        </Link>
      </div>
      <section className="Container-books">
        {favorites.map((book) => {
          return (
            <div className="Books-container">
              <li key={book.id}>
                <h1 className="Title-book"> Title: {book.title}</h1>
                <Link to={`/cart/${book.id}`}>
                  <img
                    className="Book-img"
                    src={book.formats["image/jpeg"]}
                    alt="Book"
                  />{" "}
                </Link>
                <p id="Authorp">
                  Author: {""}
                  {book.authors.map((author) => author.name.replace(",", " "))}
                </p>
                <button
                  className="link--link2 ButtonRemove"
                  onClick={() => handleRemoveFavorite(book.id)}
                >
                  Remove
                </button>
              </li>
            </div>
          );
        })}
      </section>
    </>
  );
}
