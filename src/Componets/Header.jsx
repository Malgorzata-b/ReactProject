import "./Header.css";

export default function Header() {
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
          placeholder="Write the title and author."
        />
      </form>
      <div className="Button-container">
        <button className="Button">Favorites</button>
        <button className="Button">Items</button>
      </div>
    </header>
  );
}
