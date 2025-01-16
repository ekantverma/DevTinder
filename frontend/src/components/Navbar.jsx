import { useSelector } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import {removeUser } from "../utils/userSlice";

const Navbar = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

    return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👨‍💻 DevTinder</Link>
      </div>

      {user?.firstName && (
        <div className="flex-none gap-2">
        <div className="form-control">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://media.licdn.com/dms/image/v2/D5603AQFSx39Hgmx1XQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727185193326?e=1742428800&v=beta&t=VkilHgp2MTYc4-3JQmO4c2igJ7HZXK3i5fnLqvHT4eY"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
