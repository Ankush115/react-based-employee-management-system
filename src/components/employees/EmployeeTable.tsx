import type { Employee } from "../../types/employee";
import { Link } from "react-router-dom";
import type { SortField } from "../../types/employeeTable";

interface EmployeeTableProps {
  employees: Employee[];
  sortField: SortField;
  sortDirection: "asc" | "desc";
  onSort: (field: SortField) => void;
}

const EmployeeTable = ({
  employees,
  sortField,
  sortDirection,
  onSort,
}: EmployeeTableProps) => {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th className="sortable" onClick={() => onSort("name")}>
              Employee
              {getSortIcon("name")}
            </th>

            <th className="sortable" onClick={() => onSort("email")}>
              Email
              {getSortIcon("email")}
            </th>

            <th className="sortable" onClick={() => onSort("department")}>
              Department
              {getSortIcon("department")}
            </th>

            <th className="sortable" onClick={() => onSort("role")}>
              Designation
              {getSortIcon("role")}
            </th>
            <th className="sortable" onClick={() => onSort("company")}>
              Company
              {getSortIcon("company")}
            </th>

            <th className="sortable" onClick={() => onSort("location")}>
              Location
              {getSortIcon("location")}
            </th>
            <th className="sortable" onClick={() => onSort("phone")}>
              Phone
              {getSortIcon("phone")}
            </th>
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

              <td>{employee.company.name}</td>

              <td>{employee.address.city}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
