import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      {!isEditing ? (
        // Display Profile Details
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold">John Doe</h1>
          <h3 className="text-gray-600">18</h3>
          <p className="text-gray-600">Male</p>
          <p className="text-gray-600">This is a sample about info.</p>
          <p className="text-gray-600 mt-2">Skills: JavaScript, React</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit Profile Form
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              defaultValue="John"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              defaultValue="Doe"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="text"
              name="lastName"
              defaultValue="Doe"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <input
              type="text"
              name="lastName"
              defaultValue="Doe"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">About</label>
            <textarea
              name="about"
              defaultValue="This is a sample about info."
              className="w-full px-4 py-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Skills</label>
            <input
              type="text"
              name="skills"
              defaultValue="JavaScript, React"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
