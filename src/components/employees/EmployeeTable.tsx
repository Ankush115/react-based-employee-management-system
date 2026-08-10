import type { Employee } from "../../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  sortField: "name" | "email" | "department" | "role";
  sortDirection: "asc" | "desc";
  onSort: (
    field: "name" | "email" | "department" | "role"
  ) => void;
}

const EmployeeTable = ({ employees,sortField,
  sortDirection,
  onSort, }: EmployeeTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort("name")}>
              Employee
              Employee
        {sortField === "name" &&
          (sortDirection === "asc" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => onSort("email")}>
              Email
              {sortField === "email" &&
                (sortDirection === "asc" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => onSort("department")}>
              Department
              {sortField === "department" &&
                (sortDirection === "asc" ? " ↑" : " ↓")}
            </th>
            <th onClick={() => onSort("role")}>
              Role
              {sortField === "role" &&
                (sortDirection === "asc" ? " ↑" : " ↓")}
            </th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div>
                  <img
                    src={employee.image}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    width="40"
                    height="40"
                  />

                  <span>
                    {employee.firstName} {employee.lastName}
                  </span>
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