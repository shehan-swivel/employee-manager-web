import { employeeService } from "@/services";
import { Employee, EmployeeQuery } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

type EmployeeSlice = {
  all: { data: Employee[]; loading: boolean };
  query: EmployeeQuery;
};

const initialState: EmployeeSlice = {
  all: {
    data: [],
    loading: false,
  },
  query: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    orderBy: "firstName",
    order: "asc",
  },
};

export const getEmployees = createAsyncThunk("employees/getEmployees", async (queryParams: EmployeeQuery = {}) => {
  try {
    const response = await employeeService.getEmployees(queryParams);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    updateQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      state.all = action.payload.employees?.all;
    });

    builder.addCase(getEmployees.pending, (state) => {
      state.all.loading = true;
    });
    builder.addCase(getEmployees.fulfilled, (state, { payload }) => {
      state.all.data = payload.data;
      state.all.loading = false;
    });
    builder.addCase(getEmployees.rejected, (state) => {
      state.all.loading = false;
    });
  },
});

const { actions, reducer } = employeeSlice;

export const { updateQuery } = actions;

export default reducer;
