import { BrowserRouter, Routes, Route } from "react-router-dom";

import Employees from "../pages/Employees/Employees";
import EmployeeDetails from "../components/employees/EmployeeDetails";
import AddEmployee from "../components/employees/AddEmployee";
import Login from "../pages/Auth/Login";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employees/add" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
