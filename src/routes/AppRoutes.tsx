import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Employees from "../pages/Employees/Employees";

import EmployeeDetails from "../components/Employees/EmployeeDetails";
import AddEmployee from "../components/Employees/AddEmployee";
import EditEmployee from "../components/Employees/EditEmployee";
import Dashboard from "../pages/Dashboard/Dashboard";
import Departments from "../pages/Departments/Departments";
import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />

          <Route path="/employees/add" element={<AddEmployee />} />

          <Route path="/employees/:id/edit" element={<EditEmployee />} />

          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/departments" element={<Departments />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/employees" replace />} />
    </Routes>
  );
};

export default AppRoutes;
