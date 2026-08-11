import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  fetchEmployeeById,
  updateEmployee,
} from "../../store/slices/employeeSlice";

import EmployeeForm, { type EmployeeFormData } from "./EmployeeForm";

import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

const EditEmployee = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { selectedEmployee, detailsLoading, actionLoading, error } =
    useAppSelector((state) => state.employees);

  useEffect(() => {
    if (id && selectedEmployee?.id !== Number(id)) {
      dispatch(fetchEmployeeById(id));
    }
  }, [id, dispatch, selectedEmployee?.id]);

  const onSubmit = async (data: EmployeeFormData) => {
    if (!id) {
      return;
    }

    try {
      await dispatch(
        updateEmployee({
          employeeId: id,
          employeeData: data,
        }),
      ).unwrap();

      navigate(`/employees/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (detailsLoading && !selectedEmployee) {
    return <LoadingState />;
  }

  if (error && !selectedEmployee) {
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

  const initialValues: EmployeeFormData = {
    firstName: selectedEmployee.firstName,

    lastName: selectedEmployee.lastName,

    email: selectedEmployee.email,

    phone: selectedEmployee.phone,

    age: selectedEmployee.age,

    department: selectedEmployee.company.department,

    role: selectedEmployee.company.title,
  };

  return (
    <div className="page-shell">
      <div className="content-card">
        <div className="page-header">
          <div>
            <h1>Edit Employee</h1>
            <p className="page-subtitle">Update employee information, role, and department details.</p>
          </div>
        </div>

        <EmployeeForm
          initialValues={initialValues}
          loading={actionLoading}
          error={error}
          submitLabel="Update Employee"
          onSubmit={onSubmit}
          onCancel={() => navigate(`/employees/${selectedEmployee.id}`)}
        />
      </div>
    </div>
  );
};

export default EditEmployee;
