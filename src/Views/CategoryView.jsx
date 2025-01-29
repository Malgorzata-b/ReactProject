import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";

export default function CategoryView() {
  const { categoryTopic } = useParams();
  const { error, setError, loading, setLoading, books, setBooks } =
    useContext(AppContext);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response_category = await fetch(
          ` https://gutendex.com/books/?topic=${categoryTopic}`
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

  return <section className="Container-books">I don't know yet</section>;
}
