/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { selectItemNav } from "../store/nav-select/slice";

export default function useSelectNav() {
  const itemValue = useSelector((state: any) => state.selectItemNav);
  const dispatch = useDispatch();

  const handleSelelected = (selected: string) => {
    dispatch(selectItemNav(selected));
  };

  return { itemValue, handleSelelected };
}
