import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";
import type { Employee } from "../../types/employee";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div>
      <h1>Employees</h1>

      <p>Total Employees: {employees.length}</p>

      {employees.map((employee) => (
        <div key={employee.id}>
          <h3>
            {employee.firstName} {employee.lastName}
          </h3>

          <p>{employee.email}</p>
          <p>{employee.company.department}</p>
          <p>{employee.company.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Employees;