import React, { useEffect, useRef, useState } from "react";
import { RiPushpin2Line } from "react-icons/ri";
import { RiPushpin2Fill } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineArchive } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useTodo } from "../context/todo_context/TodoContext.js";
import { useLabel } from "../context/label_context/LabelContext.js";
import { RxCross2 } from "react-icons/rx";

export const TodoCard = ({ item }) => {
  const [hover, setHover] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [pinned, setPinned] = useState(item.isPinned);
  const [labels, setLabels] = useState(() =>
    item?.labels ? item.labels.map((l) => l._id) : []
  );

  const [labelsName, setLabelsName] = useState(item.labels);
  const [archive, setArchive] = useState(item.isArchived);
  const [color, setColor] = useState(item.color);

  const [formMenu, setFormMenu] = useState(false);
  const [labelOptions, setLabelOptions] = useState(false);
  const [labelValue, setLabelValue] = useState("");

  const popRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const [popModel, setPopModel] = useState(false);

  const { updateTodo } = useTodo();
  const { labelDatas, createLabel } = useLabel();

  const handlePin = async () => {
    const newPinned = !pinned;
    setPinned(newPinned);
    await updateTodo(item._id, { isPinned: newPinned });
  };

  // const handleArchive = async () => {};

  const handelContentFeild = (e) => {
    setContent(e.target.value);
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = "max-content";
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  const handelTitleFeild = (e) => {
    setTitle(e.target.value);
    titleRef.current.style.height = "auto";
    titleRef.current.style.height = "max-content";
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  };

  const handleLabelSelect = (data, checked) => {
    // console.log("hello")
    if (checked) {
      setLabels((prev) => [...prev, data._id]);
      setLabelsName((prev) => [...prev, data]);
    } else {
      setLabels((prev) => prev.filter((item) => item !== data._id));
      setLabelsName((prev) => prev.filter((item) => item._id !== data._id));
    }
  };

  const handlePopModelLabelName = (label) => {
    setLabels((pre) => pre.filter((item) => item !== label._id));
    setLabelsName((pre) => pre.filter((item) => item._id !== label._id));
  };

  const handleLabelCreateBtn = async () => {
    await createLabel({ name: labelValue });
    setLabelValue("");
  };

  const updateAllData = async () => {
    console.log(item);
    // title, content, isPinned, labels, color, reminder, isArchived
    const itemLabelIds = item.labels.map((l) => l._id);

    const isSameLabels =
      JSON.stringify([...labels].sort()) ===
      JSON.stringify([...itemLabelIds].sort());

    const isSame =
      title.trim() === item.title &&
      content.trim() === item.content &&
      color === item.color &&
      pinned === item.isPinned &&
      isSameLabels &&
      archive === item.isArchived;

    if (isSame) {
      return false; // ❗ no update
    }

    await updateTodo(item._id, {
      title,
      content,
      color,
      isPinned: pinned,
      labels,
      isArchived: archive,
    });
    return true; // updated
  };

  const handleCloseClick = async () => {
    await updateAllData();
    setPopModel(false);
    setFormMenu(false);
    setLabelOptions(false);
    setHover(false);
  };

  useEffect(() => {
    const outSideClick = async (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) {
        setPopModel(false);
        if (title.trim() !== "" || content.trim() !== "") {
          await updateAllData();
        }
        setFormMenu(false);
        setLabelOptions(false);
        setHover(false);
      }
    };
    document.addEventListener("mousedown", outSideClick);

    return () => document.removeEventListener("mousedown", outSideClick);
  });

  const colorRef = useRef();
  const archiveRef = useRef();
  const threeDotRef = useRef();
  const pinnedRef = useRef();
  const handlePopModelOpen = (e) => {
    if (
      colorRef.current?.contains(e.target) ||
      archiveRef.current?.contains(e.target) ||
      threeDotRef.current?.contains(e.target) ||
      pinnedRef.current?.contains(e.target)
    ) {
      return;
    }
    setPopModel(true);
  };

  useEffect(() => {
    if (popModel) {
      if (titleRef.current) {
        titleRef.current.style.height = "auto";
        titleRef.current.style.height = titleRef.current.scrollHeight + "px";
      }

      if (contentRef.current) {
        contentRef.current.style.height = "auto";
        contentRef.current.style.height =
          contentRef.current.scrollHeight + "px";
      }
    }
  }, [popModel]);
  return (
    <div
  onClick={handlePopModelOpen}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  key={item._id}
  style={{ backgroundColor: item.color || "#fff" }}
  className="relative break-inside-avoid rounded-lg border border-gray-300 dark:border-gray-700 p-3 mb-2 lg:mb-3 transition hover:shadow-[0_3px_8px_rgba(0,0,0,0.24)] dark:shadow-[0_3px_8px_rgba(255,255,255,0.05)]"
>
  {/* Pin Icon */}
  <div
    ref={pinnedRef}
    className={`absolute top-3 right-3 ${hover ? "visible" : "invisible"}`}
  >
    <input
      type="checkbox"
      onChange={() => setPinned((pre) => !pre)}
      className="hidden"
      id="pinned"
      value={pinned}
    />
    <label onClick={handlePin} htmlFor="pinned" className="text-xl cursor-pointer">
      {pinned ? <RiPushpin2Fill className="text-gray-700 dark:text-gray-800" /> : <RiPushpin2Line className="text-gray-700 dark:text-gray-800" />}
    </label>
  </div>

  {/* Title & Content */}
  <div className="overflow-hidden">
    <div className="font-semibold text-lg text-gray-800 dark:text-gray-700">
      {item.title?.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
    </div>
    <div className="text-gray-600 dark:text-gray-400">
      {item.content?.length > 600 ? item.content.slice(0, 600) + "..." : item.content}
    </div>
  </div>

  {/* Labels */}
  <div className="flex flex-wrap gap-2 my-1 mb-2">
    {labelsName.length !== 0 &&
      labelsName.map((label) => (
        <div
          key={label._id}
          className="inline-flex gap-1 items-center justify-center bg-gray-300 dark:bg-gray-700 pt-1 pb-1.5 text-xs font-semibold px-2 text-gray-800 dark:text-gray-700 rounded-lg"
        >
          <button type="button">{label.name}</button>
        </div>
      ))}
  </div>

  {/* Actions on Hover */}
  <div className={`${hover ? "visible" : "invisible"}`}>
    <div className="flex gap-6">
      {/* Color Picker */}
      <div ref={colorRef} className="relative">
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          className="absolute bottom-0 left-0 opacity-0"
          id="color"
          value={color}
        />
        <label htmlFor="color" className="text-xl cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color === "#FFFFFF" ? "#e5e7eb" : color }}
          >
            <IoColorPaletteOutline className="text-gray-700 dark:text-gray-800" />
          </div>
        </label>
      </div>

      {/* Archive */}
      <div ref={archiveRef}>
        <input type="checkbox" className="hidden" id="archive" value={archive} />
        <label
          onClick={() => setArchive((pre) => !pre)}
          className="text-xl cursor-pointer"
        >
          {archive ? (
            <MdArchive className="text-gray-700 dark:text-gray-800" />
          ) : (
            <MdOutlineArchive className="text-gray-700 dark:text-gray-800" />
          )}
        </label>
      </div>

      {/* Three dots */}
      <div ref={threeDotRef} className="relative">
        <span className="text-lg cursor-pointer">
          <HiDotsVertical onClick={() => setFormMenu((pre) => !pre)} className="text-gray-700 dark:text-gray-800" />
        </span>
      </div>
    </div>
  </div>

  {/* Pop-up Modal */}
  {popModel && (
    <section className="bg-black/70 min-h-dvh fixed top-0 left-0 w-screen h-dvh z-40 flex justify-center items-center">
      <main
        ref={popRef}
        style={{ backgroundColor: color }}
        className="w-2xl p-3 md:rounded-lg relative dark:bg-[#10141e] transition-colors"
      >
        {/* Pinned checkbox */}
        <input type="checkbox" onChange={() => setPinned((pre) => !pre)} className="hidden" id="pinned2" value={pinned} />
        <label htmlFor="pinned2" className="text-xl absolute right-3 top-3 cursor-pointer">
          {pinned ? <RiPushpin2Fill className="text-gray-700 dark:text-gray-800" /> : <RiPushpin2Line className="text-gray-700 dark:text-gray-800" />}
        </label>

        <div className="max-h-[calc(100dvh-100px)] overflow-y-scroll hide-scrollbar">
          <textarea
            ref={titleRef}
            value={title}
            onChange={handelTitleFeild}
            className="w-full p-1 resize-none min-h-min text-xl font-semibold outline-none text-gray-900 dark:text-gray-700"
            placeholder="Title"
            rows={1}
          />
          <textarea
            ref={contentRef}
            value={content}
            onChange={handelContentFeild}
            rows={1}
            placeholder="Take a note..."
            className="w-full p-1 resize-none min-h-min text-lg outline-none text-gray-900 dark:text-gray-700"
          />
        </div>

        {/* Labels & Actions */}
        <div className="flex flex-wrap gap-2 my-1 mb-2">
          {labelsName.length !== 0 &&
            labelsName.map((label) => (
              <div
                key={label._id}
                className="inline-flex gap-1 items-center justify-center bg-gray-300 dark:bg-gray-700 pt-1 pb-1.5 text-xs font-semibold px-2 text-gray-800 dark:text-gray-700 rounded-lg"
              >
                <button type="button">{label.name}</button>
                <RxCross2
                  onClick={() => handlePopModelLabelName(label)}
                  className="border border-gray-300 dark:border-gray-600 text-base rounded-md cursor-pointer"
                />
              </div>
            ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between mt-2">
          <button
            onClick={handleCloseClick}
            className="font-semibold px-4 py-1 rounded-full bg-gray-200 dark:bg-[#2a2b2e] hover:bg-gray-300 dark:hover:bg-[#3a3b3f] transition cursor-pointer"
            type="button"
          >
            close
          </button>
        </div>
      </main>
    </section>
  )}
</div>

  );
};
