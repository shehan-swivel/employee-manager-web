import type { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

type UiSlice = {
  snackbar: {
    show: boolean;
    message: string;
    severity: AlertColor;
  };
};

const initialState: UiSlice = {
  snackbar: {
    show: false,
    message: "",
    severity: "info",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSnackbar(state, { payload }) {
      const { message, severity } = payload;
      state.snackbar = { ...state.snackbar, show: true, message, severity: severity || "info" };
    },

    hideSnackbar(state) {
      state.snackbar.show = false;
    },
  },
});

const { actions, reducer } = uiSlice;

export const { showSnackbar, hideSnackbar } = actions;

export default reducer;
