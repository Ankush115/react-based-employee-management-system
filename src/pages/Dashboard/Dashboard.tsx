import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchEmployees } from "../../store/slices/employeeSlice";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { Link,  } from "react-router-dom";

const Dashboard = () => {
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

  const totalEmployees = employees.length;

  const departments = new Set(
    employees.map((employee) => employee.company.department),
  ).size;

  const companies = new Set(employees.map((employee) => employee.company.name))
    .size;

  const locations = new Set(employees.map((employee) => employee.address.city))
    .size;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <p>Employee management overview</p>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-label">Total Employees</span>

          <strong className="stat-value">{totalEmployees}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Departments</span>

          <strong className="stat-value">{departments}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Companies</span>

          <strong className="stat-value">{companies}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Locations</span>

          <strong className="stat-value">{locations}</strong>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="recent-employees">
        <div className="section-header">
          <div>
            <h2>Recent Employees</h2>

            <p>Recently added employees</p>
          </div>

          <Link to="/employees" className="view-all-link">
            View All
          </Link>
        </div>

        <div className="recent-table-container">
          <table className="recent-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
              </tr>
            </thead>

            <tbody>
              {employees
                .slice(-5)
                .reverse()
                .map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <Link
                        to={`/employees/${employee.id}`}
                        className="recent-employee-link"
                      >
                        {employee.firstName} {employee.lastName}
                      </Link>
                    </td>

                    <td>{employee.email}</td>

                    <td>{employee.company.department}</td>

                    <td>{employee.company.title}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
