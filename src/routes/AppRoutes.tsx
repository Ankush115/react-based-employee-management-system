import { BrowserRouter, Routes, Route } from "react-router-dom";

import Employees from "../pages/Employees/Employees";
import EmployeeDetails from "../components/employees/EmployeeDetails";
import AddEmployee from "../components/employees/AddEmployee";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import EditEmployee from "../components/employees/EditEmployee";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/:id/edit"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
