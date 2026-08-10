import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { getEmployees } from "../../services/employeeService";
import type { Employee } from "../../types/employee";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmployees();

      return data.users;
    } catch (error) {
      console.error(error);

      return rejectWithValue(
        "Failed to fetch employees"
      );
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchEmployees.fulfilled,
        (state, action) => {
          state.loading = false;
          state.employees = action.payload;
        }
      )

      .addCase(
        fetchEmployees.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ||
            "Failed to fetch employees";
        }
      );
  },
});

export default employeeSlice.reducer;