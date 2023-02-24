import { createBrowserRouter } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import Root from "./Root";
import About from "./screens/About";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "Home",
        element: <Home />,
        errorElement: <ErrorComponent />

      }, {
        path: "About",
        element: <About />,
        errorElement: <ErrorComponent />
      }
    ],

    errorElement: <NotFound />
  }
]);

export default router;