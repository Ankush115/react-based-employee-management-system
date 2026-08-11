import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchEmployees } from "../../store/slices/employeeSlice";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { Link } from "react-router-dom";

const Departments = () => {
  const dispatch = useAppDispatch();

  const { employees, loading, error } = useAppSelector(
    (state) => state.employees,
  );

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          dispatch(fetchEmployees());
        }}
      />
    );
  }

  const departmentMap = employees.reduce(
    (acc, employee) => {
      const department = employee.company.department;

      if (!acc[department]) {
        acc[department] = [];
      }

      acc[department].push(employee);

      return acc;
    },
    {} as Record<string, typeof employees>,
  );

  const departments = Object.entries(departmentMap);

  return (
    <div className="page-shell">
      <div className="content-card">
        <div className="page-header">
          <div>
            <h1>Departments</h1>

            <p className="page-subtitle">
              Manage teams, departments, and organization structure.
            </p>
          </div>
        </div>

        <div className="department-summary">
          <strong>{departments.length}</strong>

          <span>Total Departments</span>
        </div>

        <div className="departments-grid">
          {departments.map(([department, departmentEmployees]) => (
            <div className="department-card" key={department}>
              <div className="department-card-header">
                <h2>{department}</h2>

                <span>
                  {departmentEmployees.length}{" "}
                  {departmentEmployees.length === 1 ? "Employee" : "Employees"}
                </span>
              </div>

              <div className="department-employees">
                {departmentEmployees.slice(0, 5).map((employee) => (
                  <div className="department-employee" key={employee.id}>
                    <span>
                      {employee.firstName} {employee.lastName}
                    </span>

                    <small>{employee.company.title}</small>
                  </div>
                ))}
              </div>

              {departmentEmployees.length > 5 && (
                <p className="more-employees">
                  +{departmentEmployees.length - 5} more employees
                </p>
              )}
              <Link
                to={`/employees?department=${encodeURIComponent(department)}`}
                className="department-view-link"
              >
                View Employees
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
