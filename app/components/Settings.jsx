"use client";
import { useState } from "react";

const Badge = ({ cn, text }) => {
  return (
    <span className={`${cn} px-2 py-1 rounded-full text-sm font-extralight border-[2px]`}>{text}</span>
  )
}

const AccountSettings = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(
    `https://ui-avatars.com/api/?name=${user.name}&background=random`
  );
  const [location, setLocation] = useState(user.location.countryName);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const handleSaveChanges = () => {
    // Handle saving changes to the user data
    alert("Changes Saved!");
    setIsEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-900 text-gray-200">
      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Profile Overview
        </h2>
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-300">
            Name
          </label>
          {isEditMode ? (
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-600 bg-gray-700 text-white rounded-md"
            />
          ) : (
            <p>{name}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300">
            Email
          </label>
          {isEditMode ? (
            <>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-600 bg-gray-700 text-white rounded-md"
                disabled
              />
              <p className="text-red-500 font-thin text-xs italic">
                Email cannot be changed
              </p>
            </>
          ) : (
            <p>{email}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="avatar" className="block text-gray-300">
            Avatar
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <img
              src={avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="w-16 h-16 rounded-full"
            />
            {isEditMode && (
              <button className="text-blue-400 hover:underline">
                Change Avatar
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Location</h2>
        <div>
          <p className="text-gray-300">{location}</p>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Account Verification
        </h2>
        <div>
          <p className="text-gray-300">
            Status: {user.isVerified ? <Badge cn={"text-[var(--secondary-content)] bg-green-300 border border-[var(--secondary-content)]"} text={"Verified"} /> : <Badge cn={"text-[var(--secondary-dark)] bg-red-300 border border-red-500"} text={"Not Verified"} />}
          </p>
          {!user.isVerified && (
            <button className="mt-2 text-blue-400 hover:underline">
              Resend Verification Email
            </button>
          )}
        </div>
      </section>

      <div className="flex justify-between items-center mt-8">
        <button
          className="w-1/4 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          onClick={toggleEditMode}
        >
          {isEditMode ? "Cancel" : "Edit"}
        </button>
        {isEditMode && (
          <button
            className="w-1/4 bg-green-500 text-white py-3 rounded-md hover:bg-green-600"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
