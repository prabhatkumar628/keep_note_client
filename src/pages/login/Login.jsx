import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { Loading } from "../../componests/Loading.jsx";
// import axios from "axios";
// import { authApi } from "../../api/authApi.js";

export const Login = () => {
  const nevigator = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const { user, loading,errorData, login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    if(errorData){
      console.log(errorData.response.data.data)
    }
    if(user){
      console.log(user);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      nevigator("/");
    }
  }, [loading, user, nevigator]);

  return (
    <section className="bg-[#1e1f20] w-full min-h-dvh flex justify-center items-center">
      {loading && <Loading title="loading" subtitle="plese wait" />}
      <main className="w-5xl min-h-dvh md:min-h-96  bg-[#0e0e0e] p-6 sm:p-10 md:rounded-4xl">
        <form action="" onSubmit={handleSubmit} className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 w-full h-full min-h-max">
            <div className="flex flex-col gap-4">
              <img
                className="w-[50px] max-w-[50px]"
                src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
                alt="logo"
              />
              <h1 className="text-white text-4xl">Log in</h1>
              <p className="text-white text-xl mt-2">Use your keep account</p>
            </div>
            <div className="">
              <div className="w-full h-80 flex justify-center items-center">
                <div className="flex flex-col w-full gap-6">
                  <div>
                    <div className="pb-2 flex items-center justify-between">
                      <span className="font-semibold text-red-500">
                        {errorData?.response?.data?.data &&
                          Object.values(errorData?.response?.data?.data).map((msg, i) => (
                            <p key={i} className="text-red-500 text-sm">
                              {msg}
                            </p>
                          ))}
                      </span>
                    </div>
                    <input
                      className="outline-none border border-white text-white rounded p-4 w-full"
                      placeholder="Enter your email or username"
                      type="text"
                      name="username"
                      onChange={handleChange}
                      id=""
                    />
                  </div>
                  <div>
                    <input
                      className="outline-none border border-white text-white rounded p-4 w-full"
                      placeholder="Enter your password"
                      type={showpassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      id=""
                    />
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          onChange={() => setShowPassword((pre) => !pre)}
                          type="checkbox"
                          id="check"
                          className="scale-110"
                        />
                        <label
                          htmlFor="check"
                          className="font-semibold text-[#a2c0f1]"
                        >
                          Show Password
                        </label>
                      </div>
                      <Link
                        to={"/forgot-password"}
                        className="font-semibold text-[#a2c0f1]"
                      >
                        Fogot Password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white flex justify-between md:justify-end gap-4">
            <Link
              to={"/register"}
              className="px-3 pt-1 pb-2 rounded-3xl font-semibold text-[#a2c0f1] hover:bg-[#141517] transition"
            >
              Register account
            </Link>
            <button
              type="submit"
              className="px-3 pt-1 pb-2 rounded-3xl font-semibold bg-[#a2c0f1] text-[#062e6f] hover:bg-[#b6d0fb] transition"
            >
              Login
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};
