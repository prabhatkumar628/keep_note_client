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
    // title, content, isPinned, labels, color, reminder, isArchived
    await updateTodo(item._id, {
      title,
      content,
      color,
      isPinned: pinned,
      labels,
      isArchived: archive,
    });
    setPopModel(false);
    setFormMenu(false);
    setLabelOptions(false);
    setHover(false);
  };

  useEffect(() => {
    const outSideClick = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) {
        setPopModel(false);
        if (title.trim() !== "" || content.trim() !== "") {
          updateAllData();
        }
      }
    };
    document.addEventListener("mousedown", outSideClick);

    return () => document.removeEventListener("mousedown", outSideClick);
  });

  useEffect(() => {
    if (popModel) {
      // console.log();
      console.log(archive);
    }
  }, [item, popModel, archive]);

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

  //expand title and content textarea height on popModel Active
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

  // useEffect(() => {
  //   setLabels(() => (item?.labels ? item.labels.map((l) => l._id) : []));
  //   console.log("printing")
  // }, []);

  return (
    <div
      onClick={handlePopModelOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={item._id}
      style={{ backgroundColor: item.color || "#fff" }}
      className="relative break-inside-avoid rounded-lg border border-gray-300  p-3 mb-2 lg:mb-3 transition hover:shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
    >
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
        <label onClick={handlePin} htmlFor="pinned" className="text-xl">
          {pinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
        </label>
      </div>

      <div className="overflow-hidden">
        <div className="font-semibold text-lg dm-500">
          {item.title?.length > 50
            ? item.title.slice(0, 50) + "..."
            : item.title}
        </div>

        <div className="dm-300 ">
          {item.content?.length > 600
            ? item.content.slice(0, 600) + "..."
            : item.content}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-1 mb-2">
        {labelsName.length !== 0 &&
          labelsName.map((label) => (
            <div
              key={label._id}
              className="inline-flex gap-1 items-center justify-center bg-gray-400 pt-1 pb-1.5 text-xs font-semibold px-2 text-gray-200 rounded-lg"
            >
              <button type="button">{label.name}</button>
              {/* <RxCross2
                onClick={() => handlePopModelLabelName(label)}
                className="border border-gray-300 text-base rounded-md cursor-pointer"
              /> */}
            </div>
          ))}
      </div>
      <div className={`${hover ? "visible" : "invisible"}`}>
        <div className="flex gap-6">
          <div ref={colorRef} className="relative">
            <input
              type="color"
              onChange={(e) => setColor(e.target.value)}
              className="absolute bottom-0 left-0 opacity-0"
              id="color"
              value={color}
            />
            <label htmlFor="color" className="text-xl  ">
              <IoColorPaletteOutline />
            </label>
          </div>
          <div ref={archiveRef} className="">
            <input
              type="checkbox"
              // onChange={() => setArchive((pre) => !pre)}
              className="hidden"
              id="archive"
              value={archive}
            />
            <label
              onClick={() => setArchive((pre) => !pre)}
              className="text-xl"
            >
              {archive ? <MdArchive /> : <MdOutlineArchive />}
            </label>
          </div>

          <div ref={threeDotRef} className="relative">
            <span className="text-lg">
              <HiDotsVertical onClick={() => setFormMenu((pre) => !pre)} />
            </span>
            {/* {formMenu && (
                  <div className="absolute bottom-0 left-3 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.24)] z-10 w-32 min-h-40 rounded-md overflow-hidden">
                    <ul className="flex gap-2 ">
                      <li
                        onClick={() => {
                          setFormMenu((pre) => !pre);
                          setLabelOptions((pre) => !pre);
                        }}
                        className="flex text-sm font-semibold hover:bg-gray-300 py-1.5 ps-3 transition w-full cursor-pointer"
                      >
                        Delete Label
                      </li>
                    </ul>
                  </div>
                )} */}
          </div>
        </div>
      </div>

      {/* ///////// popModel start///////////////////////////////////////// */}
      {popModel && (
        <section className="bg-[#00000070] min-h-dvh fixed top-0 left-0 w-screen h-dvh z-40 flex justify-center items-center">
          <main
            ref={popRef}
            style={{ backgroundColor: color }}
            className="w-2xl p-3 md:rounded-lg relative"
          >
            <input
              type="checkbox"
              onChange={() => setPinned((pre) => !pre)}
              className="hidden"
              id="pinned"
              value={pinned}
            />
            <label htmlFor="pinned" className="text-xl absolute right-3 top-3">
              {pinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
            </label>

            <div className="max-h-[calc(100dvh-100px)] overflow-y-scroll hide-scrollbar">
              <textarea
                ref={titleRef}
                value={title}
                onChange={handelTitleFeild}
                className="w-full p-1 resize-none min-h-min text-xl font-semibold outline-none"
                placeholder="Tital"
                name=""
                id=""
                rows={1}
              ></textarea>

              <textarea
                ref={contentRef}
                value={content}
                className="w-full p-1 resize-none min-h-min text-lg outline-none"
                onChange={handelContentFeild}
                rows={1}
                type="text"
                placeholder="Take a note..."
                name=""
                id=""
              ></textarea>
            </div>

            <div className="">
              <div className="flex flex-wrap gap-2 my-1 mb-2">
                {labelsName.length !== 0 &&
                  labelsName.map((label) => (
                    <div
                      key={label._id}
                      className="inline-flex gap-1 items-center justify-center bg-gray-400 pt-1 pb-1.5 text-xs font-semibold px-2 text-gray-200 rounded-lg"
                    >
                      <button type="button">{label.name}</button>
                      <RxCross2
                        onClick={() => handlePopModelLabelName(label)}
                        className="border border-gray-300 text-base rounded-md cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
              <div className="flex justify-between">
                <div className="flex gap-6">
                  <div className="relative">
                    <input
                      type="color"
                      onChange={(e) => setColor(e.target.value)}
                      className="absolute top-0 right-0 opacity-0"
                      id="color"
                      value={color}
                    />
                    <label htmlFor="color" className="text-xl">
                      <IoColorPaletteOutline />
                    </label>
                  </div>
                  <div className="">
                    <input
                      type="checkbox"
                      // onChange={() => setArchive((pre) => !pre)}
                      className="hidden"
                      id="archive"
                      value={archive}
                    />
                    <label
                      onClick={() => setArchive((pre) => !pre)}
                      className="text-xl"
                    >
                      {archive ? <MdArchive /> : <MdOutlineArchive />}
                    </label>
                  </div>

                  <div className="relative">
                    <span className="text-lg">
                      <HiDotsVertical
                        onClick={() => setFormMenu((pre) => !pre)}
                      />
                    </span>
                    {formMenu && (
                      <div className="absolute bottom-0 left-0 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.24)] z-10 w-32 min-h-40 rounded-md overflow-hidden">
                        <ul className="flex gap-2 ">
                          <li
                            onClick={() => {
                              setFormMenu((pre) => !pre);
                              setLabelOptions((pre) => !pre);
                            }}
                            className="flex text-sm font-semibold hover:bg-gray-300 py-1.5 ps-3 transition w-full cursor-pointer"
                          >
                            Add Label
                          </li>
                        </ul>
                      </div>
                    )}

                    {labelOptions && (
                      <div className="absolute bottom-0 left-0 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.24)] z-10 w-52 min-h-40 rounded-md overflow-hidden">
                        <ul className="flex flex-col gap-2 ">
                          <li className="flex gap-2 justify-between items-center text-sm font-semibold py-1.5 ps-3 pe-1.5 transition w-full cursor-default">
                            <span> Label Note</span>
                            <RxCross2
                              onClick={() => {
                                setFormMenu(false);
                                setLabelOptions(false);
                              }}
                              className="text-2xl cursor-pointer"
                            />
                          </li>
                          <li className="flex text-sm font-semibold py-1 ps-3 transition w-full cursor-pointer">
                            <input
                              name="label"
                              value={labelValue}
                              onChange={(e) => setLabelValue(e.target.value)}
                              className="text-gray-900 outline-none"
                              type="text"
                              placeholder="Enter label name"
                            />
                          </li>

                          <div className="max-h-48 overflow-y-auto">
                            {labelDatas.map((item) => (
                              <li key={item._id} className="flex">
                                <label
                                  htmlFor={item._id}
                                  className="flex text-sm font-semibold hover:bg-gray-300 py-1.5 ps-3 transition w-full cursor-pointer"
                                >
                                  <input
                                    id={item._id}
                                    type="checkbox"
                                    className="checked:rounded-none scale-110"
                                    checked={labels.includes(item._id)}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                      handleLabelSelect(item, e.target.checked)
                                    }
                                  />
                                  {item.name}
                                </label>
                              </li>
                            ))}
                          </div>
                          {labelValue && (
                            <li
                              onClick={handleLabelCreateBtn}
                              className="flex text-sm font-semibold hover:bg-gray-300 py-1.5 ps-3 transition w-full cursor-pointer"
                            >
                              <span>+</span>
                              <span>{labelValue}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={updateAllData}
                  className="font-semibold px-4 "
                  type="button"
                >
                  close
                </button>
              </div>
            </div>
          </main>
        </section>
      )}
    </div>
  );
};
