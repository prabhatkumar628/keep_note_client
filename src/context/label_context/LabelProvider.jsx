import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthContext.js";
import { labelApi } from "../../api/labelApi.js";
import { LabelContext } from "./LabelContext.js";

export const LabelProvider = ({ children }) => {
  const [labelDatas, setLabelDatas] = useState([]);
  const { user, setErrorData, setLoading } = useAuth();

  const getLabels = useCallback(async () => {
    try {
      setLoading(true);
      setErrorData(null);
      const response = await labelApi.getLabel();
      setLabelDatas(response.data.data);
      //   console.log(labelDatas)
    } catch (error) {
      setErrorData(error);
    } finally {
      setLoading(false);
    }
  }, [setErrorData, setLoading]);

  useEffect(() => {
    if (user) {
      getLabels();
    } else {
      setLabelDatas([]);
    }
  }, [getLabels, user]);

  const createLabel = async (data) => {
    try {
      //   setLoading(true);
      setErrorData(null);
      const response = await labelApi.createLabel(data);
      setLabelDatas((pre) => [response.data.data, ...pre]);
      return response.data.data;
    } catch (error) {
      setErrorData(error);
    } finally {
      //   setLoading(false);
    }
  };

  const updateLabel = async (id, data) => {
    try {
      //   setLoading(true);
      setErrorData(null);
      const response = await labelApi.updateLabel(id, data);
      setLabelDatas((pre) =>
        pre.map((item) =>
          item._id === id ? { ...item, ...response.data.data } : item
        )
      );
    } catch (error) {
      setErrorData(error);
    } finally {
      //   setLoading(false);
    }
  };

  const bulkUpdateLabel = async (data) => {
    try {
      //   setLoading(true);
      setErrorData(null);
      await labelApi.bulkUpdateLabel(data);
      const response = await labelApi.getLabel();
      setLabelDatas(response.data.data);
    } catch (error) {
      setErrorData(error);
    } finally {
      //   setLoading(false);
    }
  };

  const deleteLabel = async (id) => {
    try {
      //   setLoading(true);
      setErrorData(null);
      await labelApi.deleteLabel(id);
      setLabelDatas((pre) => pre.filter((item) => item._id !== id));
    } catch (error) {
      setErrorData(error);
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <>
      <LabelContext.Provider
        value={{
          getLabels,
          createLabel,
          updateLabel,
          bulkUpdateLabel,
          deleteLabel,
          labelDatas,
          setLabelDatas,
        }}
      >
        {children}
      </LabelContext.Provider>
    </>
  );
};
