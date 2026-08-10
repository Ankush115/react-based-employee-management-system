import type { Employee } from "../../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
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