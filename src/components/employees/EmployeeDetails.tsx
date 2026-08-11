import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  fetchEmployeeById,
  deleteEmployee,
} from "../../store/slices/employeeSlice";

import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

const EmployeeDetails = () => {
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

  const handleDelete = async () => {
    if (!selectedEmployee) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedEmployee.firstName} ${selectedEmployee.lastName}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteEmployee(String(selectedEmployee.id))).unwrap();

      navigate("/employees");
    } catch (error) {
      console.error("Delete failed:", error);
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

  const fullName = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;

  return (
    <div className="employee-details">
      {/* Header */}
      <div className="employee-details-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/employees")}
        >
          ← Back to Employees
        </button>

        <div className="employee-details-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate(`/employees/${selectedEmployee.id}/edit`)}
          >
            Edit
          </button>

          <button
            type="button"
            className="danger-button"
            onClick={handleDelete}
            disabled={actionLoading}
          >
            {actionLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Employee Profile */}
      <section className="employee-profile-card">
        <div className="employee-profile">
          <img
            className="employee-profile-image"
            src={
              selectedEmployee.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}`
            }
            alt={fullName}
          />

          <div className="employee-profile-info">
            <h1>{fullName}</h1>

            <p className="employee-role">{selectedEmployee.company.title}</p>

            <p className="employee-department">
              {selectedEmployee.company.department}
            </p>
          </div>
        </div>
      </section>

      {/* Information Grid */}
      <div className="employee-info-grid">
        {/* Contact Information */}
        <section className="employee-info-card">
          <h2>Contact Information</h2>

          <div className="info-item">
            <strong>Email</strong>
            <p>{selectedEmployee.email}</p>
          </div>

          <div className="info-item">
            <strong>Phone</strong>
            <p>{selectedEmployee.phone}</p>
          </div>

          <div className="info-item">
            <strong>Age</strong>
            <p>{selectedEmployee.age}</p>
          </div>
        </section>

        {/* Company Information */}
        <section className="employee-info-card">
          <h2>Company Information</h2>

          <div className="info-item">
            <strong>Company</strong>
            <p>{selectedEmployee.company.name}</p>
          </div>

          <div className="info-item">
            <strong>Department</strong>
            <p>{selectedEmployee.company.department}</p>
          </div>

          <div className="info-item">
            <strong>Designation</strong>
            <p>{selectedEmployee.company.title}</p>
          </div>
        </section>

        {/* Address */}
        <section className="employee-info-card">
          <h2>Address</h2>

          <div className="info-item">
            <strong>Address</strong>
            <p>{selectedEmployee.address.address}</p>
          </div>

          <div className="info-item">
            <strong>City</strong>
            <p>{selectedEmployee.address.city}</p>
          </div>

          <div className="info-item">
            <strong>State</strong>
            <p>{selectedEmployee.address.state}</p>
          </div>

          <div className="info-item">
            <strong>Postal Code</strong>
            <p>{selectedEmployee.address.postalCode}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmployeeDetails;
