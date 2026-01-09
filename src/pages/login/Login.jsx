import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { Loading } from "../../componests/Loading.jsx";
import logo from "../../../public/images/logo/white1.png";

export const Login = () => {
  const nevigator = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const { user, loading, errorData, login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
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
        <form onSubmit={handleSubmit} className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 h-full">
            {/* Left */}
            <div className="flex flex-col gap-4">
              <img src={logo} alt="logo" className="w-[50px]" />

              <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
                Log in
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Use your keep account
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

                {/* Username */}
                <input
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#141517] text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Enter your email or username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                />

                {/* Password */}
                <div>
                  <input
                    className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#141517] text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Enter your password"
                    type={showpassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                  />

                  <div className="flex justify-between items-center pt-3">
                    <div className="flex items-center gap-2">
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

                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 dark:text-[#a2c0f1]"
                    >
                      Forgot Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-between md:justify-end gap-4 mt-8">
            <Link
              to="/register"
              className="px-4 py-2 rounded-full font-semibold  bg-blue-100 text-blue-700 dark:bg-[#1a2333] dark:text-[#a2c0f1] hover:bg-blue-200 dark:hover:bg-[#24304a] transition"
            >
              Register account
            </Link>

            <button
              type="submit"
              className="px-6 py-2 rounded-full font-semibold bg-blue-600 dark:bg-[#a2c0f1] text-white dark:text-[#062e6f] hover:opacity-90 transition"
            >
              Login
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};
