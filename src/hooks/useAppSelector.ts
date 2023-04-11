import { RootState } from "@/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
