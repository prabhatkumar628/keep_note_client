import React, { useEffect, useRef, useState } from "react";
import { RiPushpin2Line } from "react-icons/ri";
import { RiPushpin2Fill } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineArchive } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { RxDotsVertical } from "react-icons/rx";
import { MdNewLabel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdArchive } from "react-icons/md";
import { useAuth } from "../context/AuthContext.js";
import { useTodo } from "../context/todo_context/TodoContext.js";
import { Loading } from "../componests/Loading.jsx";
import { useLabel } from "../context/label_context/LabelContext.js";
import { useParams } from "react-router-dom";
import { useLayout } from "../context/layout_context/LayoutContext.js";
import { Tooltip } from "../componests/Tooltip.jsx";

export const Main = ({ children }) => {
  const { scrollRef } = useLayout();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pin, setPin] = useState(false);
  const [labels, setLabels] = useState([]);
  const [color, setColor] = useState(null);
  const [archive, setArchive] = useState(false);

  const [click, setClick] = useState(false);
  const [formMenu, setFormMenu] = useState(false);
  const [labelOptions, setLabelOptions] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const [labelsName, setLabelsName] = useState([]);

  const inputFildBox = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const { loading } = useAuth();
  const { addTodo } = useTodo();
  const { labelDatas, createLabel } = useLabel();

  const { labelId } = useParams();
  const [currentLabel, setCurrentLabel] = useState({});

  useEffect(() => {
    if (!labelDatas) return;

    // 🔥 RESET arrays every time page changes
    setLabels([]); // ids empty
    setLabelsName([]); // objects empty
    setCurrentLabel({}); // single label object empty

    // If no labelId in URL => home page
    if (!labelId) {
      setLabelsName([]); // all labels
      setLabels([]); // all IDs
      return;
    }

    // Label page case:
    const found = labelDatas.find((l) => l._id === labelId);

    if (found) {
      setLabels([found._id]); // ✔ only this ID
      setLabelsName([found]); // ✔ only this object
      setCurrentLabel(found); // ✔ single detailed label
    }
  }, [labelId, labelDatas]);

  const handalFormSubmit = async (e) => {
    e.preventDefault();
    // title, content, isPinned, labels, color, reminder, isArchived
    if (!title && !content) {
      setClick(false);
      return;
    }
    await addTodo({
      title,
      content,
      color,
      isPinned: pin,
      labels,
      isArchived: archive,
    });
    // await getLabels();
    // await fetchTodos();

    setTitle("");
    setContent("");
    setPin(false);
    setLabels([]);
    setColor(null);
    setArchive(false);
    setLabelsName([]);
    setClick(false);
  };

  const handleOutSideSubmit = async () => {
    if (!title && !content) {
      setClick(false);
      return;
    }
    await addTodo({
      title,
      content,
      color,
      isPinned: pin,
      labels,
      isArchived: archive,
    });
    // await getLabels();
    // await fetchTodos();
    setTitle("");
    setContent("");
    setPin(false);
    setLabels([]);
    setColor(null);
    setArchive(false);
    setLabelsName([]);
    setClick(false);
  };

  const handelContentFeild = (e) => {
    setContent(e.target.value);
    contentRef.current.style.height = "max-content";
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  const handelTitleFeild = (e) => {
    setTitle(e.target.value);
    titleRef.current.style.height = "max-content";
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  };

  const handleLabelSelect = (item, checked) => {
    if (checked) {
      setLabels((prev) => [...prev, item._id]);
      setLabelsName((prev) => [...prev, item]);
    } else {
      setLabels((prev) => prev.filter((data) => data !== item._id));
      setLabelsName((prev) => prev.filter((data) => data._id !== item._id));
    }
  };
  const handleRemoveSelectedLabel = (item) => {
    setLabels((pre) => pre.filter((id) => id !== item._id));
    setLabelsName((pre) => pre.filter((data) => data._id !== item._id));
  };

  const handleLabelCreateBtn = async () => {
    await createLabel({ name: labelValue });
    setLabelValue("");
  };

  useEffect(() => {
    const outSideClick = (e) => {
      contentRef.current.style.height = "max-content";
      if (inputFildBox.current && !inputFildBox.current.contains(e.target)) {
        setClick(false);
        if (title.trim() !== "" || content.trim() !== "") {
          handleOutSideSubmit();
        }
      }
    };
    document.addEventListener("mousedown", outSideClick);
    return () => document.removeEventListener("mousedown", outSideClick);
  });

  return (
    <div
      ref={scrollRef}
      className="px-3 py-2 flex-1 overflow-y-auto bg-white dark:bg-[#0e0e0e] transition-colors hide-scrollbar scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-[#2a2b2e] dark:hover:scrollbar-thumb-[#3a3b3f] scrollbar-track-transparent"
    >
      {loading && <Loading title="loading" subtitle="plese wait" />}

      <div className="w-full">
        <form onSubmit={handalFormSubmit}>
          <div
            ref={inputFildBox}
            onClick={() => setClick(true)}
            className="flex flex-col w-full mx-auto my-3 max-w-[600px] p-3 rounded-lg relative !bg-white dark:!bg-[#10141e] border border-gray-300 dark:border-gray-600 transition-colors"
            style={{ boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em" }}
          >
            {/* Title + Pin */}
            <div className={click ? "block" : "hidden"}>
              <div className="absolute top-3 right-3 text-gray-700 dark:text-gray-200">
                <input type="checkbox" onChange={() => setPin((pre) => !pre)} className="hidden" id="pin" value={pin} />
                <label htmlFor="pin" className="text-2xl cursor-pointer">
                  <Tooltip element="div" tip={pin ? "Pinned" : "Pin"}>
                    <div className="w-8 h-8 border border-gray-300 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                      {pin ? (
                        <RiPushpin2Fill className="text-gray-700 text-lg" />
                      ) : (
                        <RiPushpin2Line className="text-gray-700 text-lg" />
                      )}
                    </div>
                  </Tooltip>
                </label>
              </div>

              <textarea
                ref={titleRef}
                value={title}
                onChange={handelTitleFeild}
                placeholder="Title"
                rows={1}
                className="w-full p-1 resize-none min-h-min text-xl font-semibold outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Content */}
            <div>
              <textarea
                ref={contentRef}
                value={content}
                className="w-full p-1 resize-none min-h-min text-lg outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                onChange={handelContentFeild}
                rows={1}
                type="text"
                placeholder="Write a note..."
              />
            </div>

            {/* Bottom Controls */}
            <div className={click ? "block" : "hidden"}>
              {/* Labels */}
              <div className="flex flex-wrap gap-2 my-1 mb-2">
                {labelsName.length !== 0 &&
                  labelsName.map((label, index) => (
                    <div
                      key={index}
                      className="inline-flex gap-1 items-center justify-center
                  bg-gray-300 dark:bg-[#2a2a2a]
                  text-xs font-semibold px-2 py-1.5
                  text-gray-800 dark:text-gray-200 rounded-lg"
                    >
                      <button type="button">{label.name}</button>
                      <RxCross2
                        onClick={() => handleRemoveSelectedLabel(label)}
                        className="border border-gray-400 dark:border-gray-600
                    text-base rounded-md cursor-pointer"
                      />
                    </div>
                  ))}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2 md:gap-4 text-gray-700 dark:text-gray-200">
                  {/* Color */}
                  <div className="relative w-8 h-8">
                    <input
                      type="color"
                      onChange={(e) => setColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      id="color"
                      value={color}
                    />

                    <label htmlFor="color" className="cursor-pointer">
                      <Tooltip element="div" tip={color ? "Edit color" : "Set color"}>
                        <div
                          style={{ backgroundColor: color === "#FFFFFF" ? "#e5e7eb" : color }}
                          className="w-8 h-8 border border-gray-300 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <IoColorPaletteOutline className="text-gray-700 text-xl" />
                        </div>
                      </Tooltip>
                    </label>
                  </div>

                  {/* Archive */}
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => setArchive((pre) => !pre)}
                      className="hidden"
                      id="archive"
                      value={archive}
                    />
                    <label htmlFor="archive" className="text-xl cursor-pointer">
                      <Tooltip element="div" tip={archive ? "Archived" : "Archive"}>
                        <div className="w-8 h-8 border border-gray-300 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
                          {archive ? (
                            <MdArchive className="text-gray-700 text-xl" />
                          ) : (
                            <MdOutlineArchive className="text-gray-700 text-xl" />
                          )}
                        </div>
                      </Tooltip>
                    </label>
                  </div>

                  {/* Menu */}
                  <div className="relative">
                    <Tooltip element="div" tip={labels?.length > 0 ? "Manage labels" : "Add label"}>
                      <div
                        onClick={() => setLabelOptions((pre) => !pre)}
                        className="w-8 h-8 border border-gray-300 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <MdNewLabel className="text-gray-700 text-lg" />
                      </div>
                    </Tooltip>

                    {/* Menu */}
                    {formMenu && (
                      <div
                        className="absolute top-full left-0
                  bg-white dark:bg-[#141517]
                  text-gray-900 dark:text-gray-200
                  shadow-[0_3px_8px_rgba(0,0,0,0.24)]
                  z-10 w-32 rounded-md overflow-hidden"
                      >
                        <ul>
                          <li
                            onClick={() => {
                              setFormMenu((pre) => !pre);
                              setLabelOptions((pre) => !pre);
                            }}
                            className="text-sm font-semibold
                        hover:bg-gray-300 dark:hover:bg-[#1f1f1f]
                        py-1.5 ps-3 transition cursor-pointer"
                          >
                            Add Label
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Label Options */}
                    {labelOptions && (
                      <div
                        className="
      absolute top-full left-0 mt-2
      z-20 w-56 rounded-lg overflow-hidden
      border border-gray-300 dark:border-gray-700
      bg-white dark:bg-[#141517]
      text-gray-900 dark:text-gray-200
      shadow-[0_6px_16px_rgba(0,0,0,0.25)]
      backdrop-blur-sm
    "
                      >
                        <ul className="flex flex-col">
                          {/* Header */}
                          <li
                            className="
          flex justify-between items-center
          px-3 py-2
          border-b border-gray-200 dark:border-gray-700
          text-sm font-semibold
        "
                          >
                            <span>Label note</span>
                            <RxCross2
                              onClick={() => {
                                setFormMenu(false);
                                setLabelOptions(false);
                              }}
                              className="
            text-xl cursor-pointer
            text-gray-600 dark:text-gray-400
            hover:text-gray-900 dark:hover:text-gray-200
            transition
          "
                            />
                          </li>

                          {/* Input */}
                          <li className="px-3 py-2">
                            <input
                              name="label"
                              value={labelValue}
                              onChange={(e) => setLabelValue(e.target.value)}
                              className="
            w-full bg-transparent outline-none
            text-sm
            text-gray-900 dark:text-gray-200
            placeholder-gray-500 dark:placeholder-gray-400
          "
                              type="text"
                              placeholder="Enter label name"
                            />
                          </li>

                          {/* Label list */}
                          <div className="max-h-44 overflow-y-auto">
                            {labelDatas.map((item) => (
                              <li key={item._id}>
                                <label
                                  htmlFor={item._id}
                                  className="
                flex items-center gap-2
                px-3 py-1.5
                text-sm font-medium
                cursor-pointer
                transition-colors
                hover:bg-gray-200 dark:hover:bg-[#1f1f1f]
              "
                                >
                                  <input
                                    id={item._id}
                                    type="checkbox"
                                    className="
                  scale-110 accent-gray-700 dark:accent-gray-300
                "
                                    checked={labels.includes(item._id)}
                                    onChange={(e) => handleLabelSelect(item, e.target.checked)}
                                  />
                                  <span className="truncate">{item.name}</span>
                                </label>
                              </li>
                            ))}
                          </div>

                          {/* Create label */}
                          {labelValue && (
                            <li
                              onClick={handleLabelCreateBtn}
                              className="
            flex items-center gap-2
            px-3 py-2
            text-sm font-semibold
            cursor-pointer
            border-t border-gray-200 dark:border-gray-700
            hover:bg-gray-200 dark:hover:bg-[#1f1f1f]
            transition-colors
          "
                            >
                              <span className="text-lg leading-none">+</span>
                              <span>Create “{labelValue}”</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Close */}
                <button
                 type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer leading-none border border-gray-300 bg-gray-300"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div>{children}</div>
    </div>
  );
};
