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
  deleteEmployee,
} from "../../store/slices/employeeSlice";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

const EmployeeDetails = () => {
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
    (state) => state.employees,
  );

  useEffect(() => {
    if (
      id &&
      selectedEmployee?.id !== Number(id)
    ) {
      dispatch(
        fetchEmployeeById(id),
      );
    }
  }, [
    id,
    dispatch,
    selectedEmployee?.id,
  ]);

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
      await dispatch(
        deleteEmployee(
          String(selectedEmployee.id),
        ),
      ).unwrap();

      navigate("/employees");
    } catch (error) {
      console.error(
        "Delete failed:",
        error,
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
              fetchEmployeeById(id),
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

  const fullName = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;

  return (
    <div className="employee-details">
      {/* Header */}
      <div className="employee-details-header">
        <button
          type="button"
          onClick={() =>
            navigate("/employees")
          }
        >
          ← Back to Employees
        </button>

        <div>
          <button
            type="button"
            onClick={() =>
              navigate(
                `/employees/${selectedEmployee.id}/edit`,
              )
            }
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Profile */}
      <section className="employee-profile">
        <img
          className="employee-profile-image"
          src={
            selectedEmployee.image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              fullName,
            )}`
          }
          alt={fullName}
        />

        <div>
          <h1>{fullName}</h1>

          <p>
            {selectedEmployee.company.title}
          </p>

          <p>
            {selectedEmployee.company.department}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <h2>Contact Information</h2>

        <div>
          <strong>Email</strong>
          <p>
            {selectedEmployee.email}
          </p>
        </div>

        <div>
          <strong>Phone</strong>
          <p>
            {selectedEmployee.phone}
          </p>
        </div>

        <div>
          <strong>Age</strong>
          <p>
            {selectedEmployee.age}
          </p>
        </div>
      </section>

      {/* Company Information */}
      <section>
        <h2>Company Information</h2>

        <div>
          <strong>Company</strong>
          <p>
            {selectedEmployee.company.name}
          </p>
        </div>

        <div>
          <strong>Department</strong>
          <p>
            {selectedEmployee.company.department}
          </p>
        </div>

        <div>
          <strong>Designation</strong>
          <p>
            {selectedEmployee.company.title}
          </p>
        </div>
      </section>

      {/* Address */}
      <section>
        <h2>Address</h2>

        <div>
          <strong>Address</strong>
          <p>
            {selectedEmployee.address.address}
          </p>
        </div>

        <div>
          <strong>City</strong>
          <p>
            {selectedEmployee.address.city}
          </p>
        </div>

        <div>
          <strong>State</strong>
          <p>
            {selectedEmployee.address.state}
          </p>
        </div>

        <div>
          <strong>Postal Code</strong>
          <p>
            {selectedEmployee.address.postalCode}
          </p>
        </div>
      </section>
    </div>
  );
};

export default EmployeeDetails;