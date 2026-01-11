import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.js";
import { Link } from "react-router-dom";

export const UserDetails = ({ setUserDetails }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [picPreview, setPicPreview] = useState("");
  const [newPic, setNewPic] = useState(null);
  const { user, logout, uploadeAvatar, updateUser, errorData } = useAuth();

  const [newUsername, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setNewPic(file);
    setPicPreview(preview);
  };

  useEffect(() => {
    if (user) {
      setNewEmail(user.email);
      setNewUserName(user.username);
    }
    if (user.fullname) {
      setNewName(user.fullname);
    }
    if (user?.avatar?.original) {
      setPicPreview(`${import.meta.env.VITE_API_BASE_URL}${user.avatar.original}`);
    } else {
      setPicPreview("/public/images/avatar/user.png");
    }
  }, [user]);

  const handleUpdatePic = async () => {
    if (!newPic) return;

    const formData = new FormData();
    formData.append("avatar", newPic);

    await uploadeAvatar(formData);

    setNewPic(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleUpdateUser = async () => {
    const formData = new FormData();
    if (newUsername) formData.append("username", newUsername);
    if (newName) formData.append("fullname", newName);
    if (newEmail) formData.append("email", newEmail);
    if (newPic) formData.append("avatar", newPic);
    await updateUser(formData);
    setNewPic(null);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed w-full h-screen top-0 left-0 bg-black/30 dark:bg-black/50 z-40">
        {/* Container */}
        <div
          className="sm:border border-gray-300 dark:border-gray-600 
             fixed z-50
             bg-white dark:bg-[#141517]
             shadow-2xl
             inset-x-0 bottom-0 h-dvh w-full
             sm:inset-auto sm:top-20 sm:right-4 sm:h-auto sm:w-[380px]
             sm:rounded-2xl
              text-gray-900 dark:text-gray-200
        "
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg">User Profile</h3>
            <Link to={"/"}>
              <button
                type="button"
                // onClick={() => setUserDetails(false)}
                className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 grid place-items-center transition"
              >
                <RxCross2 className="text-xl text-gray-700 dark:text-gray-200" />
              </button>
            </Link>
          </div>

          {/* Body */}
          <div className="px-6 py-8 text-center overflow-y-auto h-[calc(100%-64px)] sm:h-auto">
            {/* Profile Image */}
            <div
              onClick={() => fileRef.current.click()}
              className="relative w-28 h-28 mx-auto rounded-full overflow-hidden cursor-pointer shadow-md group"
            >
              <img src={picPreview} alt="avatar" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 group-hover:opacity-100 flex items-center justify-center transition">
                <FiEdit className="text-white text-xl" />
              </div>
            </div>

            {errorData && <div className="text-red-400 mt-2">{errorData?.response?.data?.message ?? "Error"}</div>}

            {newPic && (
              <button
                onClick={handleUpdatePic}
                className="mt-4 px-4 py-2 text-sm font-semibold rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
              >
                Update Avatar
              </button>
            )}

            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageChange} />

            {/* User Info */}
            <h4 className="mt-5 text-xl font-semibold">{user.name ?? user.username}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => setEditProfile(true)}
                className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editProfile && (
        <div className="min-h-dvh w-full fixed top-0 left-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-[#0f0f0f] px-4">
          {/* Card */}
          <div className="w-full max-w-sm bg-white dark:bg-[#141517] rounded-2xl shadow-xl p-6 flex flex-col justify-center relative text-gray-900 dark:text-gray-200">
            <button
              onClick={() => {
                setEditProfile(false);
                setUserDetails(false);
              }}
              className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 grid place-items-center absolute right-2 top-2 transition"
            >
              <RxCross2 className="text-xl text-gray-700 dark:text-gray-200" />
            </button>

            <h2 className="text-xl font-semibold text-center mb-5">Edit Profile</h2>

            {/* Avatar */}
            <div
              onClick={() => fileRef.current.click()}
              className="relative w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden cursor-pointer group shadow-md"
            >
              <img src={picPreview} alt="avatar" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 group-hover:opacity-100 flex items-center justify-center transition">
                <FiEdit className="text-white text-xl" />
              </div>
            </div>

            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleImageChange} />

            {/* Name */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-200"
              />
            </div>

            {/* Username */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={newUsername}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-200"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white dark:bg-[#1f1f1f] text-gray-900 dark:text-gray-200"
              />
            </div>

            {/* Update Button */}
            <button
              onClick={handleUpdateUser}
              className="w-full py-2.5 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};
