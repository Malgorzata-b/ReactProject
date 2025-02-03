import "./Header.css";
import { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { data } = useContext(AppContext);

  return (
    <header className="Header-container">
      <h1 className="Title">
        <span>Discover Books</span>
      </h1>
      <form id="books-form">
        <input
          type="text"
          name="user-input"
          id="user-input"
          placeholder="Write the title."
        ></input>
      </form>

      <div className="Button-container">
        <button className="Button">
          <Link className="FavoritesLink" to="/favorites">
            Favorites📙
          </Link>
        </button>

        <button className="Button">{`Items in cart: ${
          data.results.length || 0
        }`}</button>
      </div>
    </header>
  );
}
