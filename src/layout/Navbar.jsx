import React, { useEffect, useState } from "react";
import { LiaBarsSolid } from "react-icons/lia";
import { HiMiniBars3 } from "react-icons/hi2";
import { MdOutlineGridView } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../context/AuthContext.js";
import { useLayout } from "../context/layout_context/LayoutContext.js";
import { UserDetails } from "../componests/UserDetails.jsx";
import { MdOutlineViewDay } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../public/images/logo/white1.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { grid, setGrid, scrollRef, setSide, side, search, setSearch } = useLayout();
  const [searchBar, setSearchBar] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const { user } = useAuth();

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

  //// this grid system according to small devices
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(min-width: 640px)").matches;
  //   const handleChange = () => {
  //     if (mediaQuery) setGrid(false);
  //     else setGrid(true);
  //   };
  //   handleChange();
  // }, [setGrid]);

  return (
    <header
      className={`
      ${scroll ? "shadow-[1px_2px_4px_rgba(0,0,0,0.2)]" : ""}
      sm:px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-white
       dark:bg-[#0e0e0e] w-full fixed top-0 left-0 z-10 transition-colors`}
    >
      <nav className="flex justify-between items-center relative">
        {/* Left */}
        <div className="flex md:gap-2 items-center px-1">
          <div onClick={() => setSide((prev) => !prev)} title={side ? "Close Menu" : "Open Menu"} className="w-[50px] min-w-[50px] h-[50px] flex justify-center items-center rounded-full text-gray-800 dark:text-gray-200 transition hover:bg-gray-200 dark:hover:bg-[#1a1a1a] cursor-pointer">
            {side ? (
              <RxCross2 className=" p-2.5 w-[50px] min-w-[50px] h-[50px] flex justify-center items-center rounded-full text-gray-800 dark:text-gray-200 transition hover:bg-gray-200 dark:hover:bg-[#1a1a1a] cursor-pointer" />
            ) : (
              <HiMiniBars3 className=" p-2.5 w-[50px] min-w-[50px] h-[50px] flex justify-center items-center rounded-full text-gray-800 dark:text-gray-200 transition hover:bg-gray-200 dark:hover:bg-[#1a1a1a] cursor-pointer" />
            )}
          </div>

          <Link to={"/"}>
            <div className="flex items-center gap-1 ms-2">
              <img className="w-[43px] min-w-[43px]" src={logo} alt="logo" />
              <p className="font-semibold hidden [@media(min-width:400px)]:inline-block tracking-tight sm:tracking-normal raleway-400 text-xl sm:text-2xl text-gray-900 dark:text-white cursor-pointer">
                Likhooo
              </p>
            </div>
          </Link>
        </div>

        {/* Right */}
        <div className="flex gap-0.5 md:gap-2 justify-end items-center px-1 w-full">
          {/* Search Bar */}
          <div
            className={` ${searchBar ? "flex" : "hidden"}
            absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-12 w-[80%] z-50
            md:w-[50%] md:flex border border-gray-300 dark:border-gray-600 bg-white
            dark:bg-[#141517] hover:shadow rounded-full max-w-2xl  justify-between items-center`}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full flex-1 ps-4 outline-none
               bg-transparent
               text-gray-800 dark:text-gray-200
               placeholder:text-gray-400 dark:placeholder:text-gray-400"
              placeholder="Search"
              type="text"
            />

            <div
              className="w-10 h-10 mx-2 transition
               hover:bg-gray-200 dark:hover:bg-[#1a1a1a]
               rounded-full grid place-items-center cursor-pointer"
            >
              <div onClick={() => setSearchBar(false)} className="md:hidden">
                <RxCross2 className="font-bold text-xl text-gray-800 dark:text-gray-200" />
              </div>

              <div className="md:block hidden">
                <TfiSearch className="font-bold text-xl text-gray-800 dark:text-gray-200" />
              </div>
            </div>
          </div>

          <div
            onClick={() => setSearchBar(true)}
            title="Search"
            className={`${searchBar ? "hidden" : ""}
            md:hidden w-[50px] h-[50px] lg:hidden transition hover:bg-gray-200
            dark:hover:bg-[#1a1a1a] rounded-full grid place-items-center cursor-pointer`}
          >
            <AiOutlineSearch className="font-bold text-3xl text-gray-800 dark:text-gray-200" />
          </div>

          {/* Reload */}
          <div
            title="Reload"
            onClick={() => window.location.reload()}
            className="w-[50px] h-[50px] transition hover:bg-gray-200 dark:hover:bg-[#1a1a1a] rounded-full grid place-items-center cursor-pointer"
          >
            <TbReload className="text-3xl text-gray-800 dark:text-gray-200" />
          </div>

          {/* Grid Toggle */}
          <div
            title="Layout"
            onClick={() => setGrid((pre) => !pre)}
            className="w-[50px] h-[50px] transition hover:bg-gray-200 dark:hover:bg-[#1a1a1a] rounded-full grid place-items-center cursor-pointer"
          >
            {grid ? (
              <MdOutlineGridView className="text-3xl text-gray-800 dark:text-gray-200" />
            ) : (
              <MdOutlineViewDay className="text-3xl text-gray-800 dark:text-gray-200" />
            )}
          </div>

          {/* User Avatar */}
          <div
            className="w-[50px] h-[50px] cursor-pointer p-1.5"
            title="Profile"
            onClick={() => {
              setSide(false);
              setUserDetails((pre) => !pre);
            }}
          >
            <div
              className="w-full h-full bg-gray-200 dark:bg-[#1a1a1a]
              p-0.5 sm:p-1 transition hover:bg-gray-300 dark:hover:bg-[#242424]
              rounded-full flex justify-between items-center relative cursor-pointer"
            >
              {user?.avatar ? (
                <img
                  className="w-full h-full object-cover rounded-full cursor-pointer"
                  src={`${import.meta.env.VITE_API_BASE_URL}${user.avatar.original}`}
                  alt="avatar"
                />
              ) : (
                <p className="text-xl text-center font-semibold text-gray-800 dark:text-gray-200 w-full cursor-pointer">
                  {user?.username?.slice(0, 1).toUpperCase() ?? "U"}
                </p>
              )}

              {userDetails && <UserDetails setUserDetails={setUserDetails} />}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
