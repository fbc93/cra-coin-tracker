import NotFound from "./screens/NotFound";
import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import CoinInfo from "./routes/CoinInfo";
import ErrorComponent from "./components/ErrorComponent";
import CoinChart from "./routes/CoinChart";
import Coins from "./routes/Coins";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Coins />,
    errorElement: <NotFound />
  },
  {
    path: "/:coinId",
    element: <Coin />,
    children: [
      {
        path: "information",
        element: <CoinInfo />,
        errorElement: <ErrorComponent />
      },
      {
        path: "chart",
        element: <CoinChart />,
        errorElement: <ErrorComponent />
      }
    ],
    errorElement: <NotFound />
  }
]);

export default Router;