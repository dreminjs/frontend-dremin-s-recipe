import { AppDispatch, RootState } from "@/app";
import { useDispatch } from "react-redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
