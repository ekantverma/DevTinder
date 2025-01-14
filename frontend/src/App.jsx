import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}