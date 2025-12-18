import { BiBell } from "react-icons/bi";
import { RiPencilLine } from "react-icons/ri";
import { MdOutlineArchive } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineLightbulb } from "react-icons/md";
import { MdLabelOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Main } from "./Main.jsx";
import { useLabel } from "../context/label_context/LabelContext.js";
import { useState } from "react";
import { EditLabels } from "../componests/EditLabels.jsx";

export const Sidebar = ({ scrollRef, side, grid, chid }) => {
  const path = useLocation();
  // const [menu, setMenu] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const { labelDatas } = useLabel();

  // const sideMenuOptionMainBox = (itemPath) =>
  //   `${
  //     path.pathname === itemPath ? "bg-[#feefc3]" : "hover:bg-gray-200"
  //   } h-10 mb-2 md:mb-0 md:h-[50px] transition rounded-4xl flex items-center ${
  //     side ? "rounded-s-none w-full mx-0 px-3" : ""
  //   }`;
  const sideMenuOptionMainBox = (itemPath) =>
    ` 
  ${path.pathname === itemPath && side ? "bg-[#feefc3]" : ""}
  ${path.pathname !== itemPath && side ? "hover:bg-gray-200" : ""}
  flex items-center px-1 sm:px-4`;

  const sideMenuOptionIconBox = (itemPath) =>
    `
  ${path.pathname === itemPath && !side ? "bg-[#feefc3]" : ""}
  ${path.pathname !== itemPath && !side ? "hover:bg-gray-200" : ""}
  w-[50px] min-w-[50px] h-[50px] grid place-items-center rounded-full`;

  // Check if screen >= 1024px (lg)
  // const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

  // const handleMouseEnter = () => {
  //   if (isLargeScreen) setMenu(true);
  // };

  // const handleMouseLeave = () => {
  //   if (isLargeScreen) setMenu(false);
  // };

  return (
    <div className="flex w-full mt-[67px] h-[calc(100svh-67px)] relative">
      <div
        className={`py-2 w-[250px] min-w-[250px] transition-all duration-300 ease-in-out z-20 md:z-auto absolute 
   bg-white h-[calc(100dvh-67px)] border-r border-gray-300
   md:static md:w-[84px] md:min-w-[84px] md:!ms-0
   ${side ? "ms-0 shadow-[1px_2px_6px_rgba(0,0,0,0.2)]" : "ms-[-250px]"}
   ${side ? "md:w-[250px] shadow-[1px_2px_6px_rgba(0,0,0,0.2)]" : "md:w-[84px]"}
        `}
      >
        <div className="flex flex-col gap-1">
          <Link to={"/"} className="">
            <div className={sideMenuOptionMainBox("/")}>
              <div className={sideMenuOptionIconBox("/")}>
                <MdOutlineLightbulb className="font-bold text-2xl text-gray-800" />
              </div>
              {side && <p className="text-lg ms-4 whitespace-nowrap">Notes</p>}
            </div>
          </Link>

          {/* <div className={sideMenuOptionMainBox("/od")}>
          <div className={sideMenuOptionIconBox("/od")}>
            <BiBell className="font-bold text-2xl text-gray-800" />
          </div>
          {(side || menu) && <p className="text-lg ms-4 whitespace-nowrap">Reminders</p>}
         </div> */}

          {labelDatas.length !== 0 &&
            labelDatas.map((label) => (
              <Link
                to={`/label/${label._id}`}
                key={label._id}
                className={sideMenuOptionMainBox(`/label/${label._id}`)}
              >
                <div className={sideMenuOptionIconBox(`/label/${label._id}`)}>
                  <MdLabelOutline className="font-bold text-2xl text-gray-800" />
                </div>
                {side && (
                  <p className="text-lg ms-4 whitespace-nowrap">{label.name}</p>
                )}
              </Link>
            ))}

          <div
            onClick={() => setEditLabel((pre) => !pre)}
            className={sideMenuOptionMainBox("/od")}
          >
            <div className={sideMenuOptionIconBox("/od")}>
              <RiPencilLine className="font-bold text-2xl text-gray-800" />
            </div>
            {side && (
              <p className="text-lg ms-4 whitespace-nowrap">Edit labels</p>
            )}
          </div>
          {editLabel && (
            <EditLabels editLabel={editLabel} setEditLabel={setEditLabel} />
          )}

          <div className={sideMenuOptionMainBox("/od")}>
            <div className={sideMenuOptionIconBox("/od")}>
              <MdOutlineArchive className="font-bold text-2xl text-gray-800" />
            </div>
            {side && <p className="text-lg ms-4 whitespace-nowrap">Archive</p>}
          </div>

          <div className={sideMenuOptionMainBox("/od")}>
            <div className={sideMenuOptionIconBox("/od")}>
              <RiDeleteBin6Line className="font-bold text-2xl text-gray-800" />
            </div>
            {side && <p className="text-lg ms-4 whitespace-nowrap">Bin</p>}
          </div>
        </div>
      </div>

      {/* main todo contents */}
      <Main scrollRef={scrollRef} children={chid} grid={grid} />
    </div>
  );
};
