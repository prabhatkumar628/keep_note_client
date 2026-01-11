import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthContext.js";
import { TodoContext } from "./TodoContext.js";
import { todoApi } from "../../api/todoApi.js";

export const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState([]);
  const { user, setLoading, setErrorData } = useAuth();

  const fetchTodos = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setErrorData(null);
      const response = await todoApi.getTodo();
      setTodo(response.data.data);
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  }, [setErrorData, setLoading, user]);

  useEffect(() => {
    if (user) {
      fetchTodos();
    } else {
      setTodo([]);
    }
  }, [fetchTodos, user]);

  const addTodo = async (data) => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await todoApi.createTodo(data);
      setTodo((pre) => [response.data.data, ...pre]);
      return response;
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, data) => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await todoApi.updateTodo(id, data);
      setTodo((pre) => pre.map((item) => (item._id === id ? { ...item, ...response.data.data } : item)));
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id, isPermanent = false) => {
    try {
      setLoading(true);
      setErrorData(null);

      const response = await todoApi.deleteTodo(id, {
        permanent: isPermanent,
      });

      if (response.data.type === "SOFT_DELETE") {
        setTodo((pre) => pre.map((item) => (item._id === id ? { ...item, ...response.data.data } : item)));
      }

      if (response.data.type === "PERMANENT_DELETE") {
        setTodo((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      setErrorData(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TodoContext.Provider value={{ todo, setTodo, fetchTodos, addTodo, updateTodo, deleteTodo }}>
        {children}
      </TodoContext.Provider>
    </>
  );
};
