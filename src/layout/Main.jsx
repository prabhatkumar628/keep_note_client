import React, { useEffect, useRef, useState } from "react";
import { RiPushpin2Line } from "react-icons/ri";
import { RiPushpin2Fill } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineArchive } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { RxDotsVertical } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { MdArchive } from "react-icons/md";
import { useAuth } from "../context/AuthContext.js";
import { useTodo } from "../context/todo_context/TodoContext.js";
import { Loading } from "../componests/Loading.jsx";
import { useLabel } from "../context/label_context/LabelContext.js";
import { useParams } from "react-router-dom";

export const Main = ({ children, scrollRef }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pin, setPin] = useState(false);
  const [labels, setLabels] = useState([]);
  const [archive, setArchive] = useState(false);
  const [color, setColor] = useState("#FFFFFF");

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
    setColor("#fff");
    setPin(false);
    setLabels([]);
    setArchive(false);
    setClick(false);
  };

  const handleOutSideSubmit = async () => {
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
    setColor("#fff");
    setPin(false);
    setLabels([]);
    setArchive(false);
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
    <div ref={scrollRef} className="px-3 py-2 flex-1 overflow-y-auto">
      {loading && <Loading title="loading" subtitle="plese wait" />}
      <div className="w-full">
        <form onSubmit={handalFormSubmit}>
          <div
            ref={inputFildBox}
            onClick={() => setClick(true)}
            className={`flex flex-col w-full mx-auto my-3 max-w-[600px] p-3 rounded-lg relative border border-gray-300`}
            style={{
              backgroundColor: color,
              boxShadow:
                "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
            }}
          >
            <div className={click ? "block" : "hidden"}>
              <div className="absolute top-3 right-3">
                <input
                  type="checkbox"
                  onChange={() => setPin((pre) => !pre)}
                  className="hidden"
                  id="pin"
                  value={pin}
                />
                <label htmlFor="pin" className="text-2xl">
                  {pin ? <RiPushpin2Fill /> : <RiPushpin2Line />}
                </label>
              </div>
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
            </div>
            <div>
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
            <div className={` ${click ? "block" : "hidden"}`}>
              <div className="flex flex-wrap gap-2 my-1 mb-2">
                {labelsName.length !== 0 &&
                  labelsName.map((label, index) => (
                    <div
                      key={index}
                      className="inline-flex gap-1 items-center justify-center bg-gray-400 pt-1 pb-1.5 text-xs font-semibold px-2 text-gray-200 rounded-lg"
                    >
                      <button type="button">{label.name}</button>
                      <RxCross2
                        onClick={() => handleRemoveSelectedLabel(label)}
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
                      onChange={() => setArchive((pre) => !pre)}
                      className="hidden"
                      id="archive"
                      value={archive}
                    />
                    <label htmlFor="archive" className="text-xl">
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
                      <div className="absolute top-full left-0 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.24)] z-10 w-32 min-h-40 rounded-md overflow-hidden">
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
                      <div className="absolute top-full left-0 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.24)] z-10 w-52 min-h-40 rounded-md overflow-hidden">
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
                                  onChange={(e) =>
                                    handleLabelSelect(item, e.target.checked)
                                  }
                                />
                                {item.name}
                              </label>
                            </li>
                          ))}
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
                <button className="font-semibold px-4 " type="submit">
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
