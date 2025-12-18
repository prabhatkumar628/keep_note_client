import React, { useEffect, useState } from "react";
import { LiaBarsSolid } from "react-icons/lia";
import { MdOutlineGridView } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../context/AuthContext.js";
import { useLayout } from "../context/layout_context/LayoutContext.js";
import { UserDetails } from "../componests/UserDetails.jsx";
import { MdOutlineViewDay } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import logo from "../../public/images/logo/white1.png"

export const Navbar = ({ scrollRef, setSide, side }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const { user } = useAuth();
  const { grid, setGrid } = useLayout();

  useEffect(() => {
    let div = scrollRef.current;
    const handleScroll = () => {
      if (div.scrollTop > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    div.addEventListener("scroll", handleScroll);

    return () => div.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)").matches;
    const handleChange = () => {
      if (mediaQuery) setGrid(false);
      else setGrid(true);
    };
    handleChange();
  }, [setGrid]);

  return (
    <header
      className={`sm:px-3 ${
        scroll ? "shadow-[1px_2px_4px_rgba(0,0,0,0.2)]" : ""
      } py-2 border-b border-gray-200 w-full fixed top-0 left-0 z-10`}
    >
      <nav className="flex justify-between items-center relative">
        <div className="flex md:gap-2 items-center px-1">
          <div
            onClick={() => setSide((pre) => !pre)}
            className="w-[34px] h-[34px] sm:w-10 sm:h-10 transition hover:bg-gray-200 rounded-full grid place-items-center"
          >
            {side ? (
              <RxCross2 className="font-bold text-2xl text-gray-800" />
            ) : (
              <LiaBarsSolid className="font-bold text-2xl text-gray-800" />
            )}
          </div>
          <div className="flex items-center">
            <img
              className="w-[43px] max-w-[50px]"
              src={logo}
              alt="logo"
            />
            <p className="font-semibold tracking-tight sm:tracking-normal raleway-400 text-xl sm:text-2xl">
              Likhooo
            </p>
          </div>
        </div>

        <div className="flex gap-0.5 md:gap-2 justify-end items-center px-1 w-full">
          <div
            className={`${
              searchBar ? "flex" : "hidden"
            } absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-12 w-[80%] z-50 md:w-[50%] md:flex border border-gray-300 bg-white hover:shadow rounded-full max-w-2xl justify-between items-center`}
          >
            <input
              className={`w-full flex-1 ps-4 outline-none`}
              placeholder="Search"
              type="text"
            />
            <div className="w-10 h-10 mx-2 transition hover:bg-gray-200 rounded-full grid place-items-center cursor-pointer">
              <div onClick={() => setSearchBar(false)} className="md:hidden">
                <RxCross2 className="font-bold text-xl text-gray-800" />
              </div>
              <div className="md:block hidden">
                <TfiSearch className="font-bold text-xl text-gray-800" />
              </div>
            </div>
          </div>

          <div
            onClick={() => setSearchBar(true)}
            className={`${
              searchBar ? "hidden" : ""
            } w-[34px] md:hidden h-[34px] sm:w-10 sm:h-10 lg:hidden transition hover:bg-gray-200 rounded-full grid place-items-center`}
          >
            <TfiSearch className="font-bold text-xl text-gray-800" />
          </div>
          <div className="w-[34px] h-[34px] sm:w-10 sm:h-10 transition hover:bg-gray-200 rounded-full grid place-items-center">
            <TbReload
              onClick={() => window.location.reload()}
              className="font-bold text-2xl text-gray-800"
            />
          </div>
          <div className="w-[34px] h-[34px] sm:w-10 sm:h-10 transition hover:bg-gray-200 rounded-full grid place-items-center">
            {grid ? (
              <MdOutlineGridView
                onClick={() => setGrid((pre) => !pre)}
                className="font-bold text-2xl text-gray-800"
              />
            ) : (
              <MdOutlineViewDay
                onClick={() => setGrid((pre) => !pre)}
                className="font-bold text-2xl text-gray-800"
              />
            )}
          </div>

          <div className="w-[34px] h-[34px] sm:w-10 sm:h-10 bg-gray-200 p-0.5 sm:p-1 transition hover:bg-gray-300 rounded-full flex justify-between items-center relative">
            {user?.avatar ? (
              <img
                onClick={() => {
                  setSide(false);
                  setUserDetails((pre) => !pre);
                }}
                className="w-full h-full object-cover rounded-full"
                src={`${import.meta.env.VITE_API_BASE_URL}${
                  user.avatar.original
                }`}
                alt="avatar"
              />
            ) : (
              <p
                onClick={() => {
                  setSide(false);
                  setUserDetails((pre) => !pre);
                }}
                className="text-2xl px-1 md:px-0 md:w-full text-center font-semibold text-gray-800"
              >
                {user?.username?.slice(0, 1).toUpperCase() ?? "U"}
              </p>
            )}
            {userDetails && <UserDetails setUserDetails={setUserDetails} />}
          </div>
        </div>
      </nav>
    </header>
  );
};
