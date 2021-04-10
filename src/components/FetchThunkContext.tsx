import { createContext } from "react";
import { FetchThunk } from "../types";

const FetchThunkContext = createContext<FetchThunk>([{ fetched: {} }, async () => {}]);

export default FetchThunkContext;
