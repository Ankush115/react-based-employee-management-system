import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import type { Employee } from "../../types/employee";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeToolbar from "../../components/employees/EmployeeToolbar";

type SortField = "name" | "email" | "department" | "role";

type SortDirection = "asc" | "desc";
const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  //   const [status, setStatus] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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
    new Set(employees.map((employee) => employee.company.department)),
  );

  const roles = Array.from(
    new Set(employees.map((employee) => employee.company.title)),
  );

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = search.toLowerCase().trim();

    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm);

    const matchesDepartment =
      !department || employee.company.department === department;

    const matchesRole = !role || employee.company.title === role;

    return matchesSearch && matchesDepartment && matchesRole;
  });
const clearFilters = () => {
  setSearch("");
  setDepartment("");
  setRole("");

  setSortField("name");
  setSortDirection("asc");
};
  const getEmployeeName = (employee: Employee) => {
    return `${employee.firstName} ${employee.lastName}`;
  };
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let valueA = "";
    let valueB = "";

    switch (sortField) {
      case "name":
        valueA = getEmployeeName(a);
        valueB = getEmployeeName(b);
        break;

      case "email":
        valueA = a.email;
        valueB = b.email;
        break;

      case "department":
        valueA = a.company.department;
        valueB = b.company.department;
        break;

      case "role":
        valueA = a.company.title;
        valueB = b.company.title;
        break;
    }

    const comparison = valueA.localeCompare(valueB, undefined, {
      sensitivity: "base",
    });

    return sortDirection === "asc" ? comparison : -comparison;
  });
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
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
        Showing {filteredEmployees.length} of {employees.length} employees
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

      <EmployeeTable
        employees={sortedEmployees}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
};

export default Employees;
