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
  updateEmployee,
} from "../../store/slices/employeeSlice";

import EmployeeForm, {
  type EmployeeFormData,
} from "./EmployeeForm";

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
    if (
      id &&
      selectedEmployee?.id !== Number(id)
    ) {
      dispatch(
        fetchEmployeeById(id)
      );
    }
  }, [
    id,
    dispatch,
    selectedEmployee?.id,
  ]);

  const onSubmit = async (
    data: EmployeeFormData
  ) => {
    if (!id) {
      return;
    }

    try {
      await dispatch(
        updateEmployee({
          employeeId: id,
          employeeData: data,
        })
      ).unwrap();

      navigate(
        `/employees/${id}`
      );
    } catch (error) {
      console.error(
        "Update failed:",
        error
      );
    }
  };

  if (loading && !selectedEmployee) {
    return <LoadingState />;
  }

  if (error && !selectedEmployee) {
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

  const initialValues: EmployeeFormData = {
    firstName:
      selectedEmployee.firstName,

    lastName:
      selectedEmployee.lastName,

    email:
      selectedEmployee.email,

    phone:
      selectedEmployee.phone,

    age:
      selectedEmployee.age,

    department:
      selectedEmployee.company.department,

    role:
      selectedEmployee.company.title,
  };

  return (
    <div>
      <h1>Edit Employee</h1>

      <EmployeeForm
        initialValues={initialValues}
        loading={loading}
        error={error}
        submitLabel="Update Employee"
        onSubmit={onSubmit}
        onCancel={() =>
          navigate(
            `/employees/${selectedEmployee.id}`
          )
        }
      />
    </div>
  );
};

export default EditEmployee;