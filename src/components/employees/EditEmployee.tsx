import { useEffect } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

import {
  fetchEmployeeById,
} from "../../store/slices/employeeSlice";

import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

const EditEmployee = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    selectedEmployee,
    loading,
    error,
  } = useAppSelector(
    (state) => state.employees
  );

  useEffect(() => {
    if (id) {
      dispatch(
        fetchEmployeeById(id)
      );
    }
  }, [id, dispatch]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          if (id) {
            dispatch(
              fetchEmployeeById(id)
            );
          }
        }}
      />
    );
  }

  if (!selectedEmployee) {
    return (
      <EmptyState
        message="Employee not found."
      />
    );
  }

  return (
    <div>
      <h1>Edit Employee</h1>

      <p>
        Editing:{" "}
        {selectedEmployee.firstName}{" "}
        {selectedEmployee.lastName}
      </p>

      <button
        type="button"
        onClick={() =>
          navigate(
            `/employees/${selectedEmployee.id}`
          )
        }
      >
        Cancel
      </button>
    </div>
  );
};

export default EditEmployee;