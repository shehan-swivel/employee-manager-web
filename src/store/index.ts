import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import employeeReducer from "./slices/employeeSlice";

const store = () =>
  configureStore({
    reducer: {
      employees: employeeReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(store);
