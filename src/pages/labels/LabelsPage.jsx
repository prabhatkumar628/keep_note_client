import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../../layout/Layout.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { Loading } from "../../componests/Loading.jsx";
import { useTodo } from "../../context/todo_context/TodoContext.js";
import { useLayout } from "../../context/layout_context/LayoutContext.js";
import { TodoCard } from "../../componests/TodoCard.jsx";
import { useLabel } from "../../context/label_context/LabelContext.js";

export const LabelsPage = () => {
  const [currentLabel, setCurrentLabel] = useState({});
  const { labelId } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { todo } = useTodo();
  const { grid } = useLayout();
  const { labelDatas } = useLabel();

  useEffect(() => {
    if (!labelDatas) return;
    const found = labelDatas.find((l) => l._id === labelId);
    if (found) {
      setCurrentLabel(found);
    }
  }, [labelDatas, labelId]);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  // 🟦 Filter: Only notes that contain this labelId in item.labels array
  const data = useMemo(() => {
    if (!todo) return { pinned: [], allData: [] };

    const filtered = todo.filter((item) =>
      item.labels?.some((l) => l._id === labelId)
    );

    return filtered.reduce(
      (acc, item) => {
        if (item.isArchived) return acc;

        if (item.isPinned) acc.pinned.push(item);
        else acc.allData.push(item);

        return acc;
      },
      { pinned: [], allData: [] }
    );
  }, [todo, labelId]);

  // useEffect(()=>{
  //   console.log("hello",grid)
  // },[grid])

  if (!user) return <Loading title="loading" subtitle="please wait" />;

  return (
    <Layout>
      <>
        <div className="">
          {/* Heading */}
          <h2 className="font-bold text-xl mb-4 capitalize">
            {currentLabel.name ?? "Label Notes"}
          </h2>

          {/* ----- PINNED ----- */}
          {data.pinned.length !== 0 && (
            <div className="font-semibold mb-2">PINNED</div>
          )}

          <div
            className={`${
              grid
                ? "columns-1 max-w-3xl m-auto"
                : "columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 lg:gap-3"
            }`}
          >
            {data.pinned.map((item) => (
              <TodoCard key={item._id} item={item} />
            ))}
          </div>

          {/* ----- OTHERS ----- */}
          {data.pinned.length !== 0 && (
            <div className="font-semibold mt-6 mb-2">OTHERS</div>
          )}

          <div
            className={`${
              grid
                ? "columns-1 max-w-3xl m-auto"
                : "columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 lg:gap-3"
            }`}
          >
            {data.allData.map((item) => (
              <TodoCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </>
    </Layout>
  );
};
