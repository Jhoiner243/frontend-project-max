import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useUpdateParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  const updateSearchParams = useCallback(
    (updates: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      setSearchParam(`?${params.toString()}`);
    },
    [setSearchParam, searchParams]
  );
  return { updateSearchParams };
};
