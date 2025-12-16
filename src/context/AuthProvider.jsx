import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { authApi } from "../api/authApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setErrorData(null);
        const response = await authApi.currentUser();
        setUser(response.data.data);
        return;
      } catch {
        // ignore
      }

      try {
        await authApi.refreshUser();
        const response = await authApi.currentUser();
        setUser(response.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (data) => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await authApi.register(data);
      setUser(response.data.data);
      return response;
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await authApi.login(data);
      setUser(response.data.data);
      return response;
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await authApi.logout();
      setUser(null);
      return response;
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  const crurentUser = async () => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await authApi.currentUser();
      setUser(response.data.data);
      return response;
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadeAvatar = async (data) => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await authApi.uploadAvatar(data);
      setUser(response.data.data);
      return response;
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data) => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await authApi.updateUser(data);
      setUser(response.data.data);
      return response;
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        errorData,
        setErrorData,
        register,
        login,
        crurentUser,
        logout,
        uploadeAvatar,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
