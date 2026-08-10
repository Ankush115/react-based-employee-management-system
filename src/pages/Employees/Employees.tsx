import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import type { Employee } from "../../types/employee";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeToolbar from "../../components/employees/EmployeeToolbar";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();

      setEmployees(data.users);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
const filteredEmployees = employees.filter((employee) => {
  const searchTerm = search.toLowerCase();

  const fullName =
    `${employee.firstName} ${employee.lastName}`.toLowerCase();

  return (
    fullName.includes(searchTerm) ||
    employee.email.toLowerCase().includes(searchTerm)
  );
});
  return (
    <div>
      <h1>Employees</h1>

      <p>Total Employees: {employees.length}</p>

       <EmployeeToolbar
      search={search}
      onSearchChange={setSearch}
    />

      <EmployeeTable employees={filteredEmployees} />
    </div>
  );
};

export default Employees;