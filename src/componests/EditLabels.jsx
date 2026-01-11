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

  // 🔐 Snapshot of original labels
  const originalLabelsRef = useRef([]);

  // 📌 Take snapshot when modal opens
  useEffect(() => {
    if (editLabel && labelDatas?.length) {
      originalLabelsRef.current = labelDatas.map((item) => ({
        _id: item._id,
        name: item.name,
      }));
    }
  }, [editLabel]);

  const handleEdit = (label, value) => {
    setLabelDatas((prev) => prev.map((item) => (item._id === label._id ? { ...item, name: value } : item)));
  };

  const handleLabelCreateBtn = async () => {
    if (!newLabel.trim()) return;
    await createLabel({ name: newLabel });
    setNewLabel("");
  };

  const handleLabelDelete = async (id) => {
    await deleteLabel(id);
  };

  // 🔍 Detect changes
  const isLabelChanged = () => {
    const original = originalLabelsRef.current;

    if (original.length !== labelDatas.length) return true;

    return original.some((orig) => {
      const current = labelDatas.find((l) => l._id === orig._id);
      return !current || current.name !== orig.name;
    });
  };

  const handleBulkUpdateLabel = async () => {
    // ❌ No change → just close
    if (!isLabelChanged()) {
      setEditLabel(false);
      return;
    }

    const data = labelDatas.map((item) => ({
      _id: item._id,
      name: item.name,
    }));

    await bulkUpdateLabel(data);
    setEditLabel(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      {loading && <Loading title="loading" subtitle="plese wait" />}
      <div className="bg-white dark:bg-[#141517] w-full max-w-[350px] shadow-xl p-3 text-gray-900 dark:text-gray-200">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">Edit Labels</h2>

        {/* Create Label */}
        <div className="flex py-1 px-1 items-center gap-1.5 mb-2">
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

        {/* Labels List */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {labelDatas.map((label) => (
            <div
              key={label._id}
              className="flex items-center gap-3 py-1 px-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1f1f]"
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
                onClick={() => setActiveEdit((prev) => (prev === label._id ? null : label._id))}
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
