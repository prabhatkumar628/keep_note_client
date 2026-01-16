import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { useLabel } from "../context/label_context/LabelContext.js";
import { Loading } from "./Loading.jsx";
import { useAuth } from "../context/AuthContext.js";

export const EditLabels = ({ editLabel, setEditLabel }) => {
  const [newLabel, setNewLabel] = useState("");
  const [activeEdit, setActiveEdit] = useState(null);

  const { labelDatas, setLabelDatas, createLabel, deleteLabel, bulkUpdateLabel } = useLabel();
  const { loading } = useAuth();

  // 🔒 Snapshot of original labels (ONLY existing ones)
  const originalLabelsRef = useRef([]);

  useEffect(() => {
    if (editLabel) {
      originalLabelsRef.current = labelDatas.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    }
  }, [editLabel, labelDatas]);

  // Rename label
  const handleEdit = (label, value) => {
    setLabelDatas((prev) =>
      prev.map((item) => (item._id === label._id ? { ...item, name: value, isEdited: true } : item))
    );
  };

  // Create label (NO isEdited)
  const handleLabelCreateBtn = async () => {
    if (!newLabel.trim()) return;
    await createLabel({ name: newLabel });
    setNewLabel("");
  };

  // 🗑 Delete
  const handleLabelDelete = async (id) => {
    await deleteLabel(id);
  };

  // 🚀 Close / Bulk Update
  const handleBulkUpdateLabel = async () => {
    const originalIds = new Set(originalLabelsRef.current.map((l) => l._id));

    // ✅ Only update labels that:
    // 1. existed before
    // 2. user renamed them
    const editedLabels = labelDatas
      .filter((label) => label.isEdited && originalIds.has(label._id))
      .map(({ _id, name }) => ({ _id, name }));

    // ❌ Case 1: sirf create hua, rename nahi
    if (editedLabels.length === 0) {
      setActiveEdit(null);
      setEditLabel(false);
      return;
    }

    // ✅ Case 2 & 3
    await bulkUpdateLabel(editedLabels);

    setActiveEdit(null);
    setEditLabel(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center">
      {loading && <Loading title="loading" subtitle="please wait" />}

      <div className="bg-white dark:bg-[#141517] w-full max-w-[350px] shadow-xl p-3 text-gray-900 dark:text-gray-200">
        <h2 className="text-xl font-semibold mb-4">Edit Labels</h2>

        {/* Create */}
        <div className="flex items-center gap-1.5 mb-2">
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#1f1f1f] grid place-items-center">
            {newLabel ? <RxCross2 size={18} onClick={() => setNewLabel("")} /> : <FiPlus size={18} />}
          </button>

          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Create new label"
            className="flex-1 px-3 py-2 rounded-lg outline-none bg-gray-100 dark:bg-[#1f1f1f]"
          />

          <button
            onClick={handleLabelCreateBtn}
            className={`${
              newLabel ? "visible" : "invisible"
            } w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#1f1f1f] grid place-items-center`}
          >
            <FaCheck size={16} />
          </button>
        </div>

        {/* List */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {labelDatas.map((label) => (
            <div
              key={label._id}
              className="flex items-center gap-3 px-1 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f1f]"
            >
              <button
                onClick={() => handleLabelDelete(label._id)}
                className="w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#1f1f1f] grid place-items-center"
              >
                <MdDelete />
              </button>

              <input
                type="text"
                readOnly={activeEdit !== label._id}
                value={label.name}
                onChange={(e) => handleEdit(label, e.target.value)}
                className={`flex-1 px-2 py-1 rounded-md outline-none ${
                  activeEdit === label._id
                    ? "bg-gray-100 dark:bg-[#1f1f1f] ring-1 ring-gray-300 dark:ring-gray-600"
                    : "bg-transparent"
                }`}
              />

              <button
                onClick={() => setActiveEdit((p) => (p === label._id ? null : label._id))}
                className="w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#1f1f1f] grid place-items-center"
              >
                <RiPencilFill size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 text-end">
          <button
            onClick={handleBulkUpdateLabel}
            className="font-semibold px-6 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-[#1f1f1f]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
