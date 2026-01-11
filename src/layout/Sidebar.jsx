import { RiPencilLine } from "react-icons/ri";
import { MdOutlineArchive } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineLightbulb } from "react-icons/md";
import { MdLabelOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Main } from "./Main.jsx";
import { useLabel } from "../context/label_context/LabelContext.js";
import { useEffect, useRef, useState } from "react";
import { EditLabels } from "../componests/EditLabels.jsx";
import { useLayout } from "../context/layout_context/LayoutContext.js";

export const Sidebar = ({ chid }) => {
  const { scrollRef, side, grid, setSide } = useLayout();
  const path = useLocation();
  const [editLabel, setEditLabel] = useState(false);
  const { labelDatas } = useLabel();
  const sidebarRef = useRef();

  const sideMenuOptionMainBox = (itemPath) => `
  ${path.pathname === itemPath && side ? "bg-[#feefc3] dark:bg-[#3a3320]" : ""}
  ${path.pathname !== itemPath && side ? "hover:bg-gray-200 dark:hover:bg-[#2a2a2a]" : ""}
  flex items-center px-1 sm:px-4 rounded-r-full transition`;

  const sideMenuOptionIconBox = (itemPath) => `
  ${path.pathname === itemPath && !side ? "bg-[#feefc3] dark:bg-[#3a3320]" : ""}
  ${path.pathname !== itemPath && !side ? "hover:bg-gray-200 dark:hover:bg-[#2a2a2a]" : ""}
  w-[50px] min-w-[50px] h-[50px]  grid place-items-center rounded-full transition`;

  useEffect(() => {
    const handleCloseSideBarOutSideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSide(false);
      }
    };

    document.addEventListener("mousedown", handleCloseSideBarOutSideClick);
    return () => document.removeEventListener("mousedown", handleCloseSideBarOutSideClick);
  }, [setSide]);

  return (
    <div className="flex w-full mt-[67px] h-[calc(100svh-67px)] relative">
      <div
        className={`${side ? "w-full" : "w-fit"}
      h-[calc(100dvh-67px)] absolute md:static md:w-fit top-0 left-0 z-10 md:z-0 bg-black/70`}
      >
        <div
          ref={sidebarRef}
          className={`py-2 w-[250px] min-w-[250px] transition-all duration-300 ease-in-out overflow-x-hidden
         z-20 md:z-0 absolute bg-white dark:bg-[#0e0e0e] h-[calc(100dvh-67px)]
         border-r border-gray-300 dark:border-gray-700 md:static md:w-[84px] md:min-w-[84px] md:!ms-0
         ${side ? "ms-0 shadow-[1px_2px_6px_rgba(0,0,0,0.2)]" : "ms-[-250px]"}
         ${side ? "md:w-[250px]" : "md:w-[84px]"}
         `}
        >
          <div className="flex flex-col gap-1">
            {/* Notes */}
            <Link to={"/"}>
              <div className={sideMenuOptionMainBox("/")}>
                <div className={sideMenuOptionIconBox("/")}>
                  <MdOutlineLightbulb className="text-2xl text-gray-800 dark:text-gray-200" />
                </div>
                <p className="text-lg ms-5 whitespace-nowrap text-gray-800 dark:text-gray-200">Notes</p>
              </div>
            </Link>

            {/* Labels */}
            {labelDatas.length !== 0 &&
              labelDatas.map((label) => (
                <Link to={`/label/${label._id}`} key={label._id}>
                  <div className={sideMenuOptionMainBox(`/label/${label._id}`)}>
                    <div className={sideMenuOptionIconBox(`/label/${label._id}`)}>
                      <MdLabelOutline className="text-2xl text-gray-800 dark:text-gray-200" />
                    </div>
                    <p className="text-lg ms-5 whitespace-nowrap text-gray-800 dark:text-gray-200">{label.name}</p>
                  </div>
                </Link>
              ))}

            {/* Edit Labels */}
            <div
              onClick={() => {
                setSide(false);
                setEditLabel((pre) => !pre);
              }}
              className={`${sideMenuOptionMainBox("/od")} cursor-pointer`}
            >
              <div className={sideMenuOptionIconBox("/od")}>
                <RiPencilLine className="text-2xl text-gray-800 dark:text-gray-200" />
              </div>
              <p className="text-lg ms-5 whitespace-nowrap text-gray-800 dark:text-gray-200">Edit labels</p>
            </div>

            {/* Archive */}
            <Link to={"/archived"}>
              <div className={sideMenuOptionMainBox("/archived")}>
                <div className={sideMenuOptionIconBox("/archived")}>
                  <MdOutlineArchive className="text-2xl text-gray-800 dark:text-gray-200" />
                </div>
                <p className="text-lg ms-5 whitespace-nowrap text-gray-800 dark:text-gray-200">Archive</p>
              </div>
            </Link>

            {/* Bin */}
            <Link to={"/trashed"}>
              <div className={sideMenuOptionMainBox("/trashed")}>
                <div className={sideMenuOptionIconBox("/trashed")}>
                  <RiDeleteBin6Line className="text-2xl text-gray-800 dark:text-gray-200" />
                </div>
                <p className="text-lg ms-5 whitespace-nowrap text-gray-800 dark:text-gray-200">Bin</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {editLabel && <EditLabels editLabel={editLabel} setEditLabel={setEditLabel} />}

      {/* Main Content */}
      <Main scrollRef={scrollRef} children={chid} grid={grid} />
    </div>
  );
};
