import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(addUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div
      className={`navbar rounded-md transition-all duration-300 fixed z-50 w-full${
        isScrolled
          ? "w-[95%] mt-2 shadow-lg backdrop-blur-md rounded-2xl mx-8"
          : "w-full bg-base-300"
      }`}
    >
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👨‍💻 DevTinder
        </Link>
      </div>

      {user?.firstName && (
        <div className="flex-none gap-2">
          <div className="form-control text-white">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photoUrl || "/default-avatar.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
