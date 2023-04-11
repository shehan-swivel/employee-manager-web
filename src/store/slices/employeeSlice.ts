import { createSlice } from "@reduxjs/toolkit";

type EmployeeSlice = {};

const initialState: EmployeeSlice = {};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
});

const { reducer } = employeeSlice;

export default reducer;
