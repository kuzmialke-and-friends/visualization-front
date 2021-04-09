import { useContext } from "react";

import { FetchThunk } from "../server/fetch";
import FetchThunkContext from "./FetchThunkContext";

export default function useFetchThunk(): FetchThunk {
  const fetchThunk = useContext(FetchThunkContext);
  if (!fetchThunk) {
    throw new Error("FetchThunk context not initialized!");
  }
  return fetchThunk;
}
