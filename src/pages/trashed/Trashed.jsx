import React, { useEffect, useMemo } from "react";
import { Layout } from "../../layout/Layout.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import { Loading } from "../../componests/Loading.jsx";
import { useTodo } from "../../context/todo_context/TodoContext.js";
import { useLayout } from "../../context/layout_context/LayoutContext.js";
import { TodoCard } from "../../componests/TodoCard.jsx";

export const Trashed = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { todo } = useTodo();
  const { grid, setSide, search } = useLayout();

  useEffect(() => {
    setSide(false);
  }, [location.pathname, setSide]);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  const data = useMemo(() => {
    if (!todo) return [];

    const q = search?.trim().toLowerCase();

    return todo.filter((item) => {
      // 🗑️ ONLY TRASHED TODOS
      if (!item.isTrashed) return false;

      // 🔍 SEARCH FILTER
      if (q) {
        return item.title?.toLowerCase().includes(q) || item.content?.toLowerCase().includes(q);
      }

      return true;
    });
  }, [todo, search]);

  if (!user) return <Loading title="loading" subtitle="please wait" />;

  return (
    <Layout>
      <>
        <div className="">
          {/* Heading */}
          <h2 className="font-bold text-xl mb-4 capitalize dark:text-gray-200">Trashed Notes</h2>
          <div
            className={`${
              grid ? "columns-1 max-w-3xl m-auto" : "columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 lg:gap-3"
            }`}
          >
            {data.map((item) => (
              <TodoCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      </>
    </Layout>
  );
};
