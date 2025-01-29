import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Category() {
  const { category } = useParams();

  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  return (
    <section className="Categories-container">
      {categories.map((category) => (
        <Link
          key={category}
          className="link--link"
          to={`/category/${category}`}
        >
          {category}
        </Link>
      ))}
    </section>
  );
}
