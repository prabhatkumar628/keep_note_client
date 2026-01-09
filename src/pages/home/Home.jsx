import React, { useEffect, useMemo } from "react";
import { Layout } from "../../layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { Loading } from "../../componests/Loading.jsx";
import { useTodo } from "../../context/todo_context/TodoContext.js";
import { TodoCard } from "../../componests/TodoCard.jsx";
import { useLayout } from "../../context/layout_context/LayoutContext.js";

export const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { todo } = useTodo();
  const { grid } = useLayout();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const data = useMemo(() => {
    if (!todo) return { pinned: [], allData: [] };

    return todo.reduce(
      (acc, item) => {
        if (item.isArchived) return acc;

        if (item.isPinned) acc.pinned.push(item);
        else acc.allData.push(item);

        return acc;
      },
      { pinned: [], allData: [] }
    );
  }, [todo]);

  if (!user) return <Loading title="loading" subtitle="please wait" />;

  return (
    <Layout>
      <div className="">
        {/* ----- PINNED ----- */}
        {data.pinned.length !== 0 && <div className="font-semibold mb-2 text-gray-700 dark:text-gray-300">PINNED</div>}

        <div
          className={`${
            grid ? "columns-1 max-w-3xl m-auto" : "columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 lg:gap-3"
          }`}
        >
          {data.pinned.map((item) => (
            <TodoCard key={item._id} item={item} />
          ))}
        </div>

        {/* ----- OTHERS ----- */}
        {data.pinned.length !== 0 && (
          <div className="font-semibold mt-6 mb-2 text-gray-700 dark:text-gray-300">OTHERS</div>
        )}

        <div
          className={`${
            grid ? "columns-1 max-w-3xl m-auto" : "columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 lg:gap-3"
          }`}
        >
          {data.allData.map((item) => (
            <TodoCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
