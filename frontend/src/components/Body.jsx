import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const isPublicRoute = ["/login", "/signup", "/"].includes(location.pathname);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data)); // Add user data to Redux store
    } catch (err) {
      // Handle unauthorized access (e.g., 401)
      if (err.response && err.response.status === 401 && !isPublicRoute) {
        navigate("/login"); // Redirect to login if the user is unauthorized
      } else {
        console.error("Error fetching user data:", err);
      }
    }
  };

  useEffect(() => {
    // Check authentication only for protected routes
    if (!userData && !isPublicRoute) {
      fetchUser();
    }
  }, [location, userData, isPublicRoute]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
