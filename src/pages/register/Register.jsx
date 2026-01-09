import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../componests/Loading.jsx";
import { useAuth } from "../../context/AuthContext.js";
import logo from "../../../public/images/logo/white1.png";

export const Register = () => {
  const nevigator = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const { user, loading, errorData, register } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    await register(form);
  };

  useEffect(() => {
    if (!loading && user) {
      nevigator("/");
    }
  }, [loading, user, nevigator]);

  return (
    <section className="w-full min-h-dvh flex justify-center items-center bg-gray-100 dark:bg-[#201f1e] transition-colors">
      {loading && <Loading title="Loading" subtitle="Please wait..." />}

      <main className="w-full max-w-5xl min-h-dvh md:min-h-[420px] flex justify-center items-center bg-white dark:bg-[#0e0e0e] p-6 sm:p-10 md:rounded-3xl shadow-xl transition-colors">
        <form onSubmit={registerUser} className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 h-full">

            {/* Left */}
            <div className="flex flex-col gap-4">
              <img src={logo} alt="logo" className="w-[50px]" />

              <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
                Create account
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Use your email to create a keep account
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center">
              <div className="w-full flex flex-col gap-6">

                {/* Errors */}
                {errorData?.response?.data?.data &&
                  Object.values(errorData.response.data.data).map((msg, i) => (
                    <p
                      key={i}
                      className="text-sm text-red-500 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded"
                    >
                      {msg}
                    </p>
                  ))}

                {/* Email */}
                <input
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#141517] text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                />

                {/* Password */}
                <div>
                  <input
                    className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#141517] text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Create a password"
                    type={showpassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                  />

                  <div className="flex items-center gap-2 pt-3">
                    <input
                      type="checkbox"
                      id="check"
                      onChange={() => setShowPassword((p) => !p)}
                      className="scale-110"
                    />
                    <label
                      htmlFor="check"
                      className="text-sm font-medium text-blue-600 dark:text-[#a2c0f1]"
                    >
                      Show Password
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-between md:justify-end gap-4 mt-8">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full font-semibold bg-blue-100 text-blue-700 dark:bg-[#1a2333] dark:text-[#a2c0f1] hover:bg-blue-200 dark:hover:bg-[#24304a] transition"
            >
              Login
            </Link>

            <button
              type="submit"
              className="px-6 py-2 rounded-full font-semibold bg-blue-600 dark:bg-[#a2c0f1] text-white dark:text-[#062e6f] hover:opacity-90 transition"
            >
              Register
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};
