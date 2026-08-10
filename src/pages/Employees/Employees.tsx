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
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
//   const [status, setStatus] = useState("");

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

  const departments = Array.from(
    new Set(
      employees.map((employee) => employee.company.department)
    )
  );

  const roles = Array.from(
    new Set(
      employees.map((employee) => employee.company.title)
    )
  );

  const filteredEmployees = employees.filter((employee) => {
  const searchTerm = search.toLowerCase().trim();

  const fullName =
    `${employee.firstName} ${employee.lastName}`.toLowerCase();

  const matchesSearch =
    fullName.includes(searchTerm) ||
    employee.email.toLowerCase().includes(searchTerm);

  const matchesDepartment =
    !department ||
    employee.company.department === department;

  const matchesRole =
    !role ||
    employee.company.title === role;

  return matchesSearch && matchesDepartment && matchesRole;
});
const clearFilters = () => {
  setSearch("");
  setDepartment("");
  setRole("");
};

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Employees</h1>

      <p>
        Showing {filteredEmployees.length} of{" "}
        {employees.length} employees
      </p>

      <EmployeeToolbar
        search={search}
        department={department}
        role={role}
        departments={departments}
        roles={roles}
        onSearchChange={setSearch}
        onDepartmentChange={setDepartment}
        onRoleChange={setRole}
          onClearFilters={clearFilters}

      />

      <EmployeeTable employees={filteredEmployees} />
    </div>
  );
};

export default Employees;