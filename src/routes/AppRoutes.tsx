import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/Auth/Login";
import Employees from "../pages/Employees/Employees";

import EmployeeDetails from "../components/Employees/EmployeeDetails";
import AddEmployee from "../components/Employees/AddEmployee";
import EditEmployee from "../components/Employees/EditEmployee";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/employees"
          element={<Employees />}
        />

        <Route
          path="/employees/add"
          element={<AddEmployee />}
        />

        <Route
          path="/employees/:id/edit"
          element={<EditEmployee />}
        />

        <Route
          path="/employees/:id"
          element={<EmployeeDetails />}
        />
      </Route>

      {/* Default Route */}
      <Route
        path="*"
        element={
          <Navigate
            to="/employees"
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;