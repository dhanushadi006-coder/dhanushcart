import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Emergency from "./pages/Emergency";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/email" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;