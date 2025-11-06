import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { GamePage } from "./pages/Game";
import { AdminPage } from "./pages/Admin";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};
