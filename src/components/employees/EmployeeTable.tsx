import type { Employee } from "../../types/employee";
import { Link } from "react-router-dom";

interface EmployeeTableProps {
  employees: Employee[];
  sortField: "name" | "email" | "department" | "role";
  sortDirection: "asc" | "desc";
  onSort: (field: "name" | "email" | "department" | "role") => void;
}

const EmployeeTable = ({
  employees,
  sortField,
  sortDirection,
  onSort,
}: EmployeeTableProps) => {
  const getSortIcon = (
    field: "name" | "email" | "department" | "role",
  ) => {
    if (sortField !== field) return null;

    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th
              className="sortable"
              onClick={() => onSort("name")}
            >
              Employee
              {getSortIcon("name")}
            </th>

            <th
              className="sortable"
              onClick={() => onSort("email")}
            >
              Email
              {getSortIcon("email")}
            </th>

            <th
              className="sortable"
              onClick={() => onSort("department")}
            >
              Department
              {getSortIcon("department")}
            </th>

            <th
              className="sortable"
              onClick={() => onSort("role")}
            >
              Role
              {getSortIcon("role")}
            </th>

            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="employee-cell">
                  <img
                    className="avatar"
                    src={
                      employee.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        `${employee.firstName} ${employee.lastName}`,
                      )}`
                    }
                    alt={`${employee.firstName} ${employee.lastName}`}
                  />

                  <div className="employee-name">
                    <Link to={`/employees/${employee.id}`}>
                      {employee.firstName} {employee.lastName}
                    </Link>
                  </div>
                </div>
              </td>

              <td>{employee.email}</td>

              <td>{employee.company.department}</td>

              <td>{employee.company.title}</td>

              <td>{employee.phone}</td>

              <td>{employee.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;