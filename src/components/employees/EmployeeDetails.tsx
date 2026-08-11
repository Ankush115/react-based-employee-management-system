import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { fetchEmployeeById } from "../../store/slices/employeeSlice";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

const EmployeeDetails = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { selectedEmployee, loading, error } = useAppSelector(
    (state) => state.employees,
  );

  useEffect(() => {
    if (id && selectedEmployee?.id !== Number(id)) {
      dispatch(fetchEmployeeById(id));
    }
  }, [id, dispatch, selectedEmployee?.id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          if (id) {
            dispatch(fetchEmployeeById(id));
          }
        }}
      />
    );
  }

  if (!selectedEmployee) {
    return <EmptyState message="Employee not found." />;
  }

  return (
    <div>
      <button type="button" onClick={() => navigate("/employees")}>
        Back to Employees
      </button>
      <button
        type="button"
        onClick={() => navigate(`/employees/${selectedEmployee.id}/edit`)}
      >
        Edit Employee
      </button>

      <h1>
        {selectedEmployee.firstName} {selectedEmployee.lastName}
      </h1>

      <p>
        <strong>Email:</strong> {selectedEmployee.email}
      </p>

      <p>
        <strong>Phone:</strong> {selectedEmployee.phone}
      </p>

      <p>
        <strong>Age:</strong> {selectedEmployee.age}
      </p>

      <p>
        <strong>Gender:</strong> {selectedEmployee.gender}
      </p>

      <p>
        <strong>Department:</strong> {selectedEmployee.company.department}
      </p>

      <p>
        <strong>Role:</strong> {selectedEmployee.company.title}
      </p>

      <p>
        <strong>Company:</strong> {selectedEmployee.company.name}
      </p>

      <p>
        <strong>Address:</strong> {selectedEmployee.address.address},{" "}
        {selectedEmployee.address.city}
      </p>
    </div>
  );
};

export default EmployeeDetails;
