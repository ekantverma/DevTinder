import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}