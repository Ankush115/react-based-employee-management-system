import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee as updateEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
} from "../../services/employeeService";

import type { Employee } from "../../types/employee";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  role: string;
}

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;

  // Loading states
  loading: boolean;
  detailsLoading: boolean;
  actionLoading: boolean;

  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,

  loading: false,
  detailsLoading: false,
  actionLoading: false,

  error: null,
};

/* =====================================================
   FETCH ALL EMPLOYEES
===================================================== */

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmployees();

      return data.users;
    } catch (error) {
      console.error("Fetch employees error:", error);

      return rejectWithValue("Failed to fetch employees");
    }
  },
);

/* =====================================================
   FETCH EMPLOYEE BY ID
===================================================== */

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (employeeId: string, { rejectWithValue }) => {
    try {
      const data = await getEmployeeById(employeeId);

      return data as Employee;
    } catch (error) {
      console.error("Fetch employee details error:", error);

      return rejectWithValue("Failed to fetch employee details");
    }
  },
);

/* =====================================================
   ADD EMPLOYEE
===================================================== */

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData: EmployeeFormData, { rejectWithValue }) => {
    try {
      const data = await createEmployee(employeeData);

      return data;
    } catch (error) {
      console.error("Create employee error:", error);

      return rejectWithValue("Failed to create employee");
    }
  },
);

/* =====================================================
   UPDATE EMPLOYEE
===================================================== */

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (
    {
      employeeId,
      employeeData,
    }: {
      employeeId: string;
      employeeData: EmployeeFormData;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await updateEmployeeApi(employeeId, employeeData);

      console.log("Update thunk response:", data);

      return data;
    } catch (error) {
      console.error("Update employee error:", error);

      return rejectWithValue("Failed to update employee");
    }
  },
);

/* =====================================================
   DELETE EMPLOYEE
===================================================== */

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeId: string, { rejectWithValue }) => {
    try {
      await deleteEmployeeApi(employeeId);

      // Return the ID we deleted.
      // This is safer than depending on
      // DummyJSON's delete response shape.
      return employeeId;
    } catch (error) {
      console.error("Delete employee error:", error);

      return rejectWithValue("Failed to delete employee");
    }
  },
);

/* =====================================================
   EMPLOYEE SLICE
===================================================== */

const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ===============================================
         FETCH ALL EMPLOYEES
      =============================================== */

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

      /* ===============================================
         FETCH SINGLE EMPLOYEE
      =============================================== */

      .addCase(fetchEmployeeById.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
        state.selectedEmployee = null;
      })

      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.selectedEmployee = action.payload;
      })

      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.detailsLoading = false;

        state.error =
          (action.payload as string) || "Failed to fetch employee details";
      })

      /* ===============================================
         ADD EMPLOYEE
      =============================================== */

      .addCase(addEmployee.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.employees.push(action.payload);
      })

      .addCase(addEmployee.rejected, (state, action) => {
        state.actionLoading = false;

        state.error = (action.payload as string) || "Failed to create employee";
      })

      /* ===============================================
         UPDATE EMPLOYEE
      =============================================== */

      .addCase(updateEmployee.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.actionLoading = false;

        const updatedEmployee = action.payload;

        const index = state.employees.findIndex(
          (employee) => employee.id === updatedEmployee.id,
        );

        if (index !== -1) {
          state.employees[index] = updatedEmployee;
        }

        if (state.selectedEmployee?.id === updatedEmployee.id) {
          state.selectedEmployee = updatedEmployee;
        }
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.actionLoading = false;

        state.error = (action.payload as string) || "Failed to update employee";
      })

      /* ===============================================
         DELETE EMPLOYEE
      =============================================== */

      .addCase(deleteEmployee.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.actionLoading = false;

        const employeeId = Number(action.payload);

        state.employees = state.employees.filter(
          (employee) => employee.id !== employeeId,
        );

        if (state.selectedEmployee?.id === employeeId) {
          state.selectedEmployee = null;
        }
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.actionLoading = false;

        state.error = (action.payload as string) || "Failed to delete employee";
      });
  },
});

export default employeeSlice.reducer;
