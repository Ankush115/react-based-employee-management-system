import { BrowserRouter, Routes, Route, } from "react-router-dom"

// import Dashboard from "../pages/Dashboard/Dashboard"
import Employees from "../pages/Employees/Employees"
// import Departments from "../pages/Departments/Departments"
import EmployeeDetails from "../components/employees/EmployeeDetails"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route
          path="/employees"
          element={<Employees />}
        />
        <Route
    path="/employees/:id"
    element={<EmployeeDetails />}
  />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes