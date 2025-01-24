import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Feed from "./components/Feed.jsx";
import Profile from "./components/Profile.jsx";
import Connections from "./components/Connections.jsx";
import ConnectionRequest from "./components/ConnectionRequest.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";

export default function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<ConnectionRequest />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
