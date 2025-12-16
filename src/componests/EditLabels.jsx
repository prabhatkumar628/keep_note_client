import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdLabel, MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { useLabel } from "../context/label_context/LabelContext.js";

export const EditLabels = ({ editLabel, setEditLabel }) => {
  const [newLabel, setNewLabel] = useState("");
  const [activeEdit, setActiveEdit] = useState(null);
  const {
    labelDatas,
    setLabelDatas,
    createLabel,
    deleteLabel,
    bulkUpdateLabel,
  } = useLabel();

  const handleEdit = (label, value) => {
    setLabelDatas((prev) =>
      prev.map((item) =>
        item._id === label._id ? { ...item, name: value } : item
      )
    );
  };

  const handleLabelCreateBtn = async () => {
    await createLabel({ name: newLabel });
    setNewLabel("");
  };

  const handleLabelDelete = async (id) => {
    await deleteLabel(id);
  };

  const handleBulkUpdateLabel = async () => {
    const data = labelDatas.map((item) => ({ _id: item._id, name: item.name }));
    await bulkUpdateLabel(data);
    setEditLabel(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-[350px] shadow-xl p-3">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Edit Labels
        </h2>

        {/* Create New Label Section */}
        <div className="flex py-1 px-1 items-center gap-1.5 mb-2 group">
          <button className="w-8 h-8 cursor-pointer rounded-full hover:bg-gray-200 grid place-items-center transition">
            {newLabel ? (
              <RxCross2 size={18} onClick={() => setNewLabel("")} />
            ) : (
              <FiPlus size={18} />
            )}
          </button>

          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Create new label"
            className="flex-1 bg-gray-100 px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-gray-400 transition"
          />

          <button
            onClick={handleLabelCreateBtn}
            className={`${
              newLabel ? "visible" : "invisible"
            } w-8 h-8 cursor-pointer rounded-full hover:bg-gray-200 grid place-items-center transition`}
          >
            <FaCheck size={16} />
          </button>
        </div>

        {/* Existing Labels */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {labelDatas.length !== 0 &&
            labelDatas.map((label) => (
              <div
                key={label._id}
                className="flex items-center gap-3 py-1 px-1 hover:bg-gray-100 rounded-lg transition"
              >
                {/* Left Icon */}
                <button
                  onClick={() => handleLabelDelete(label._id)}
                  className="w-8 h-8 cursor-pointer rounded-full hover:bg-gray-200 grid place-items-center transition text-gray-700"
                >
                  <MdDelete />
                </button>

                {/* Input */}
                <input
                  type="text"
                  readOnly={activeEdit !== label._id}
                  value={label.name}
                  onChange={(e) => handleEdit(label, e.target.value)}
                  className={`flex-1 px-2 py-1 rounded-md outline-none ${
                    activeEdit === label._id
                      ? "bg-gray-100 ring-1 ring-gray-300"
                      : "bg-transparent"
                  } transition`}
                />

                {/* Pencil Icon */}
                <button
                  className="w-8 h-8 cursor-pointer rounded-full hover:bg-gray-200 grid place-items-center transition"
                  onClick={() =>
                    setActiveEdit((prev) =>
                      prev === label._id ? null : label._id
                    )
                  }
                >
                  <RiPencilFill size={18} />
                </button>
              </div>
            ))}
        </div>
        <div className="border-t-2 my-2 pt-2 text-end">
          <button
            onClick={handleBulkUpdateLabel}
            type="button"
            className="font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};
