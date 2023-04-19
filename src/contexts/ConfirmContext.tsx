import { AnyAction } from "@reduxjs/toolkit";
import { useMemo, createContext, useReducer } from "react";
import type { ReactNode } from "react";

const SHOW_CONFIRM = "SHOW_CONFIRM";
const HIDE_CONFIRM = "HIDE_CONFIRM";

type ConfirmContextState = {
  show: boolean;
  message: string;
};

type ConfirmContextType = ConfirmContextState & {
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

const ConfirmContext = createContext<ConfirmContextType>({
  ...initialState,
  showConfirm: () => {},
  hideConfirm: () => {},
});

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showConfirm = async (message: string) => {
    dispatch({ type: "SHOW_CONFIRM", payload: { message } });
  };

  const hideConfirm = async () => {
    dispatch({ type: "HIDE_CONFIRM" });
  };

  const providerValue = useMemo(() => ({ ...state, showConfirm, hideConfirm }), [state]);

  return <ConfirmContext.Provider value={providerValue}>{children}</ConfirmContext.Provider>;
};

export default ConfirmContext;
