import React, { useState } from "react";
import FeedCard from "./FeedCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [showAlert, setShowAlert] = useState(false); // For alert visibility
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowAlert(true); // Show the alert

      // Hide the alert after 2 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center my-10 relative">
      {/* Alert Notification */}
      {showAlert && (
        <div
          className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md animate-bounce"
          style={{ zIndex: 1000 }}
        >
          Profile updated successfully!
        </div>
      )}

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 w-full max-w-5xl px-5">
        {/* Edit Profile Form */}
        <div className="card bg-base-300 w-full lg:w-1/2 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="my-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter photo URL"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  placeholder="Enter your age"
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your gender"
                  className="input input-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </div>
            <div className="my-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  placeholder="Write something about yourself"
                  className="textarea textarea-bordered w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-bold text-center mb-5">Profile Preview</h2>
          <FeedCard
            feed={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
