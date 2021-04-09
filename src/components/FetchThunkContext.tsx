import { createContext } from "react";
import { FetchThunk } from "../server/fetch";

const FetchThunkContext = createContext<FetchThunk | undefined>(undefined);

export default FetchThunkContext;
