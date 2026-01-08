// App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
