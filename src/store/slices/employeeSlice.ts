import { employeeService } from "@/services";
import { Employee, EmployeeQuery } from "@/types";
import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { showSnackbar } from "./uiSlice";

type EmployeeSlice = {
  all: { data: Employee[]; loading: boolean };
  query: EmployeeQuery;
  submit: { loading: boolean; success: boolean };
  selected: { data: Employee; loading: boolean };
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
    orderBy: "",
    order: "",
  },
  submit: {
    loading: false,
    success: false,
  },
  selected: {
    data: {} as Employee,
    loading: false,
  },
};

export const getEmployees = createAsyncThunk("employees/getEmployees", async (queryParams: EmployeeQuery = {}) => {
  const response = await employeeService.getEmployees(queryParams);
  return response.data;
});

export const createEmployee = createAsyncThunk("employees/createEmployee", async (data: Employee, thunkAPI) => {
  try {
    const response = await employeeService.createEmployee(data);
    thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
    return response.data;
  } catch (error: any) {
    thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
    throw error;
  }
});

export const getEmployeeById = createAsyncThunk("employees/getEmployeeById", async (id: string) => {
  const response = await employeeService.getEmployeeById(id);
  return response.data;
});

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }: { id: string; data: Employee }, thunkAPI) => {
    try {
      const response = await employeeService.updateEmployee(id, data);
      thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
      throw error;
    }
  }
);

export const deleteEmployee = createAsyncThunk("employees/deleteEmployee", async (id: string, thunkAPI) => {
  try {
    const response = await employeeService.deleteEmployee(id);
    thunkAPI.dispatch(showSnackbar({ message: response.data.message, severity: "success" }));
    return id;
  } catch (error: any) {
    thunkAPI.dispatch(showSnackbar({ message: error.response.data.message, severity: "error" }));
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
      state.selected = action.payload.employees?.selected;
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

    builder.addCase(createEmployee.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(createEmployee.fulfilled, (state, { payload }) => {
      state.all.data.push(payload.data);
      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(createEmployee.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });

    builder.addCase(getEmployeeById.pending, (state) => {
      state.selected.loading = true;
    });
    builder.addCase(getEmployeeById.fulfilled, (state, { payload }) => {
      state.selected.data = payload.data;
      state.selected.loading = false;
    });
    builder.addCase(getEmployeeById.rejected, (state) => {
      state.selected.loading = false;
    });

    builder.addCase(updateEmployee.pending, (state) => {
      state.submit.loading = true;
      state.submit.success = false;
    });
    builder.addCase(updateEmployee.fulfilled, (state, { payload }) => {
      const index = state.all.data.findIndex((el) => el._id === payload.data._id);
      if (index >= 0) {
        state.all.data[index] = payload.data;
      }

      state.submit.loading = false;
      state.submit.success = true;
    });
    builder.addCase(updateEmployee.rejected, (state) => {
      state.submit.loading = false;
      state.submit.success = false;
    });

    builder.addCase(deleteEmployee.fulfilled, (state, { payload }) => {
      state.all.data = state.all.data.filter((el) => el._id !== payload);
    });
  },
});

const { actions, reducer } = employeeSlice;

export const { updateQuery } = actions;

export default reducer;
