import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Dashboard from "../pages/Dashboard/Dashboard"
import Employees from "../pages/Employees/Employees"
import Departments from "../pages/Departments/Departments"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/departments" element={<Departments />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes