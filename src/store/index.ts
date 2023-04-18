import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import employeeReducer from "./slices/employeeSlice";
import uiReducer from "./slices/uiSlice";

const store = () =>
  configureStore({
    reducer: {
      employees: employeeReducer,
      ui: uiReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(store);
