import { AnyAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";
import { createContext, useReducer } from "react";

const SHOW_CONFIRM = "SHOW_CONFIRM";
const HIDE_CONFIRM = "HIDE_CONFIRM";

type ConfirmContextState = {
  show: boolean;
  message: string;
};

type ConfirmContext = ConfirmContextState & {
  showConfirm: (message: string) => void;
  hideConfirm: () => void;
};

const initialState: ConfirmContextState = {
  show: false,
  message: "",
};

export const reducer = (state: ConfirmContextState, action: AnyAction) => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        show: true,
        message: action.payload.message,
      };

    case HIDE_CONFIRM:
      return { ...state, show: false };

    default:
      return state;
  }
};

const ConfirmContext = createContext<ConfirmContext>({
  ...initialState,
  showConfirm: () => {},
  hideConfirm: () => {},
});

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showConfirm = async (message: string) => {
    dispatch({ type: "SHOW_CONFIRM", payload: { message } });
    return;
  };

  const hideConfirm = async () => {
    dispatch({ type: "HIDE_CONFIRM" });
    return;
  };

  return <ConfirmContext.Provider value={{ ...state, showConfirm, hideConfirm }}>{children}</ConfirmContext.Provider>;
};

export default ConfirmContext;
