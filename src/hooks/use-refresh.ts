"use client";
import { useCallback, useEffect, useState } from "react";

export const useRefreshData = <T>(
  fetchData: () => Promise<{ data: T; message: string }>
): {
  data: T | undefined;
  message: string | undefined;
  refreshData: () => Promise<void>;
} => {
  const [data, setData] = useState<T>();
  const [message, setMessage] = useState<string>("");

  const refreshData = useCallback(async (): Promise<void> => {
    const { data, message } = await fetchData();

    setData(data);
    setMessage(message);
  }, [fetchData]);

  useEffect(() => {
    refreshData();
  }, []);

  return { data, refreshData, message };
};
