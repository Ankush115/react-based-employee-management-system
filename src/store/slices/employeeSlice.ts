import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { getEmployees } from "../../services/employeeService";

import type { Employee } from "../../types/employee";

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,
};

export const fetchEmployees =
  createAsyncThunk(
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

export const fetchEmployeeById =
  createAsyncThunk(
    "employees/fetchEmployeeById",
    async (
      employeeId: string,
      { rejectWithValue }
    ) => {
      try {
        const response = await fetch(
          `https://dummyjson.com/users/${employeeId}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch employee"
          );
        }

        const data: Employee =
          await response.json();

        return data;
      } catch (error) {
        console.error(error);

        return rejectWithValue(
          "Failed to fetch employee details"
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

      // Fetch all employees
      .addCase(
        fetchEmployees.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

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
      )

      // Fetch single employee
      .addCase(
        fetchEmployeeById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.selectedEmployee = null;
        }
      )

      .addCase(
        fetchEmployeeById.fulfilled,
        (state, action) => {
          state.loading = false;

          state.selectedEmployee =
            action.payload;
        }
      )

      .addCase(
        fetchEmployeeById.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ||
            "Failed to fetch employee details";
        }
      );
  },
});

export default employeeSlice.reducer;