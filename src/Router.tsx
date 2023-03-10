import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./screens/NotFound";
import { createBrowserRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import CoinInfo from "./routes/CoinInfo";
import CoinChart from "./routes/CoinChart"
import Coins from "./routes/Coins";
import App from "./App";

// const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <Coins />,
//       },
//       {
//         path: ":coinId",
//         element: <Coin />,
//         children: [
//           {
//             path: "information",
//             element: <CoinInfo />
//           },
//           {
//             path: "chart",
//             element: <CoinChart />
//           }
//         ]
//       }
//     ],
//     errorElement: <NotFound />
//   },
// ]);

// export default Router;

function BrowserRouter() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="information" element={<CoinInfo />} />
          <Route path="chart" element={<CoinChart />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default BrowserRouter;