import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createHashRouter } from "react-router-dom";
import "./global.css";
import App from "./App.jsx";
import HomeView from "./Views/HomeView.jsx";
import CategoryView from "./Views/CategoryView.jsx";
import ErrorView from "./Views/ErrorView.jsx";
import CartBookView from "./Views/CartBookView.jsx";
import Favorites from "./Views/FavoritesView.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "category/:categoryTopic",
        element: <CategoryView />,
      },
      {
        path: "cart/:cartID",
        element: <CartBookView />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
