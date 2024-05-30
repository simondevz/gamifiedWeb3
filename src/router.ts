import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import GameSettings from "./pages/gameSettings";
import Scrabble from "./pages/scrabble";
import GameOver from "./pages/gameOver";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/games",
        children: [
          {
            index: true,
            Component: GameSettings,
          },
        ],
      },
    ],
  },
  {
    path: "/scrabble",
    children: [
      {
        index: true,
        Component: Scrabble,
      },
      {
        path: "gameover",
        children: [
          {
            index: true,
            Component: GameOver,
          },
        ],
      },
    ],
  },
]);

export default router;
