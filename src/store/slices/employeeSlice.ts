import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
} from "../../services/employeeService";

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

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmployees();

      return data.users;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to fetch employees");
    }
  },
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (employeeId: string, { rejectWithValue }) => {
    try {
      const data = await getEmployeeById(employeeId);

      return data as Employee;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to fetch employee details");
    }
  },
);
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (
    employeeData: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      age: number;
      department: string;
      role: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await createEmployee(employeeData);

      return data;
    } catch (error) {
      console.error(error);

      return rejectWithValue("Failed to create employee");
    }
  },
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch all employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })

      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;

        state.error = (action.payload as string) || "Failed to fetch employees";
      })

      // Fetch single employee
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedEmployee = null;
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload;
      })

      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) || "Failed to fetch employee details";
      })

      // Add employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;

        state.employees.push(action.payload);
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;

        state.error = (action.payload as string) || "Failed to create employee";
      });
  },
});

export default employeeSlice.reducer;
