"use client";
import { useState } from "react";

const Badge = ({ cn, text }) => {
  return (
    <span
      className={`${cn} px-2 py-1 rounded-full text-sm font-extralight border-[2px]`}
    >
      {text}
    </span>
  );
};

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
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-[var(--background)] text-gray-200">
      <section className="bg-zinc-800 p-6 rounded-lg shadow-md">
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
            <p className="bg-[var(--primary-light)] p-2">{name}</p>
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
            <p className="bg-[var(--primary-light)] p-2">{email}</p>
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

        {isEditMode ? null : (
          <div>
            <label htmlFor="current-password" className="block text-gray-300">
              Current Password
            </label>
            <input
              type="password"
              id="current-password"
              placeholder="**********"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-600 bg-gray-700 text-white rounded-md"
              disabled
            />
          </div>
        )}
        {isEditMode && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">
              Change Password
            </h3>
            <div>
              <label htmlFor="current-password" className="block text-gray-300">
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                placeholder="*********"
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-600 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-gray-300">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-600 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-600 bg-gray-700 text-white rounded-md"
              />
            </div>
          </div>
        )}
      </section>

      <section className="bg-zinc-800 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Location</h2>
        <div>
          <p className="bg-[var(--primary-light)] p-2">{location}</p>
        </div>
      </section>

      <section className="bg-zinc-800 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Account Verification
        </h2>
        <div>
          <p className="text-gray-300">
            Status:{" "}
            {user.isVerified ? (
              <Badge
                cn={
                  "text-[var(--secondary-content)] bg-green-300 border border-[var(--secondary-content)]"
                }
                text={"Verified"}
              />
            ) : (
              <Badge
                cn={
                  "text-[var(--secondary-dark)] bg-red-300 border border-red-500"
                }
                text={"Not Verified"}
              />
            )}
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
          className="w-1/4 bg-[var(--secondary-dark)] text-white font-thin p-2 rounded-md hover:bg-[var(--secondary-light)]"
          onClick={toggleEditMode}
        >
          {isEditMode ? "Cancel" : "Edit"}
        </button>
        {isEditMode && (
          <button
            className="w-fit bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
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
