import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation(); // react-router maneja el location reactivamente

  const queryParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const params: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [location.search]); // 🔥 cambia de referencia cada vez que cambia la URL

  const updateQueryParam = useCallback(
    (key: string, value: string) => {
      const currentParams = new URLSearchParams(location.search);
      currentParams.set(key, value);
      const newURL = `${location.pathname}?${currentParams.toString()}`;
      window.history.replaceState({}, "", newURL);
      // NO se necesita updateParamsFromURL porque location va a cambiar y causar rerender
    },
    [location.pathname, location.search]
  );

  return { queryParams, updateQueryParam };
};

export default useQueryParams;
