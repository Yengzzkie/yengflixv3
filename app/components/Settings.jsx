"use client";
import { useState } from "react";
import { GenericBadge } from "./ui/VerifiedBadge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PasswordInput from "./ui/PasswordInput";
import NotificationAlert from "./ui/NotificationAlert";
import Loader from "./ui/Loader";
import axios from "axios";

const AccountSettings = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Manage disabled state
  const [timer, setTimer] = useState(0); // Timer for the resend button
  const [showBanner, setShowBanner] = useState(false);
  const avatar = `https://ui-avatars.com/api/?name=${user.name}&background=random`;
  const {  data: session, update } = useSession();
  const router = useRouter();

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const handleSaveChanges = async () => {
    // Handle saving changes to the user data
    const formData = new FormData();

    if (name !== user.name) formData.append("name", name);
    if (newPassword) {
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);
    }

    try {
      const response = await axios.post(
        `/api/users/update?email=${user.email}`,
        formData
      );

      if (response.status === 200) {
        // Update the session with the new user data
        await update({...session, user: {...session?.user, name: response?.data?.name}});
        alert("Changes saved successfully");
        setIsEditMode(false);
        router.refresh();
      }
    } catch (error) {
      console.error({ error });
      setCurrentPassword("");
      setNewPassword("");
      setError(error.response?.data?.message);
    }
  };

  // resend verification email
  async function resendVerificationEmail() {
    setLoading(true);
    setIsButtonDisabled(true); // Disable the button
    setTimer(60); // Set the timer to 30 seconds
    try {
      const response = await axios.post("/api/users/resend-verification", {
        email: user.email,
      });

      if (response.status === 200) {
        setShowBanner(true);
      }
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false);

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setShowBanner(false);
            setIsButtonDisabled(false); // Re-enable the button
          }
          return prev - 1;
        });
      }, 1000);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-[var(--background)] text-gray-200">
      <NotificationAlert status={"info"} text={"If you make any update on your account, please sign out then sign back in for the update to reflect."} />
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
                value={user.email}
                className="mt-2 p-3 w-full border border-gray-600 bg-gray-700 text-white rounded-md"
                disabled
              />
              <p className="text-red-500 font-thin text-xs italic">
                Email cannot be changed
              </p>
            </>
          ) : (
            <p className="bg-[var(--primary-light)] p-2">{user.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="avatar" className="block text-gray-300">
            Avatar
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <img
              src={avatar}
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
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setError("");
              }}
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
              <p className="text-red-500 italic font-sm">{error}</p>
              <PasswordInput setPassword={setNewPassword} />
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
          <p className="bg-[var(--primary-light)] p-2">
            {user.location.countryName}
          </p>
        </div>
      </section>
      {showBanner && <NotificationAlert status={"success"} text={<>Verification email sent. If you don't receive it after 30 seconds, check your <strong>Spam</strong> folder</>} />}
      <section className="bg-zinc-800 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Account Verification
        </h2>
        <div>
          <p className="text-gray-300">
            Status:{" "}
            {user.isVerified ? (
              <GenericBadge
                cn={
                  "text-[var(--secondary-content)] bg-green-200 border border-[var(--secondary-content)]"
                }
                text={"Verified"}
              />
            ) : (
              <GenericBadge
                cn={
                  "text-[var(--secondary-dark)] bg-red-200 border border-red-500"
                }
                text={"Not Verified"}
              />
            )}
          </p>
          {!user.isVerified && (
            <div>
              {loading ? (
                <Loader />
              ) : (
                <button
                  onClick={resendVerificationEmail}
                  className={`mt-2 text-blue-400 hover:underline ${
                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isButtonDisabled} // Disable the button when necessary
                >
                  Resend Verification Email
                </button>
              )}
              {isButtonDisabled && (
                <p className="text-sm text-gray-400 mt-1">
                  You can resend the email in {timer} seconds.
                </p>
              )}
            </div>
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
