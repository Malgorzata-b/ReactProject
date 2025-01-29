import { useState, useEffect, createContext } from "react";
import Header from "./Componets/Header";
import { Outlet } from "react-router-dom";
import Category from "./Componets/Category";

export const AppContext = createContext();

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState([]);
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]);

  const apiURL = "https://gutendex.com/books";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(apiURL);

        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const result = await response.json();
        // console.log(result);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <AppContext.Provider
        value={{
          data,
          setData,
          error,
          setError,
          loading,
          setLoading,
          book,
          setBook,
          cart,
          setCart,
          books,
          setBooks,
        }}
      >
        <div>
          <Header />
          <Category />

          <main>
            <Outlet />
          </main>
        </div>
      </AppContext.Provider>
    </>
  );
}
