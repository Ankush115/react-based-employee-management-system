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
    <div className="page-shell">
      <div className="content-card">
        <div className="button-row">
          <button className="secondary-button" type="button" onClick={() => navigate("/employees")}>Back to Employees</button>
          <button className="primary-button" type="button" onClick={() => navigate(`/employees/${selectedEmployee.id}/edit`)}>Edit Employee</button>
        </div>

        <div className="detail-grid">
          <section className="profile-card">
            <img
              className="profile-avatar"
              src={
                selectedEmployee.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
                )}&background=2563eb&color=fff&rounded=true&size=128`
              }
              alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
            />

            <div>
              <h1>{selectedEmployee.firstName} {selectedEmployee.lastName}</h1>
              <p className="profile-subtitle">{selectedEmployee.company.title} — {selectedEmployee.company.department}</p>
            </div>

            <div className="profile-meta">
              <div>
                <span>Email</span>
                <p>{selectedEmployee.email}</p>
              </div>
              <div>
                <span>Phone</span>
                <p>{selectedEmployee.phone}</p>
              </div>
              <div>
                <span>Office</span>
                <p>{selectedEmployee.company.name}</p>
              </div>
            </div>
          </section>

          <section className="info-card">
            <div className="info-section">
              <h2>Personal Details</h2>
              <div className="info-row">
                <div className="info-label">Age</div>
                <div className="info-value">{selectedEmployee.age}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Gender</div>
                <div className="info-value">{selectedEmployee.gender}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Address</div>
                <div className="info-value">{selectedEmployee.address.address}, {selectedEmployee.address.city}</div>
              </div>
            </div>

            <div className="info-section">
              <h2>Company Info</h2>
              <div className="info-row">
                <div className="info-label">Department</div>
                <div className="info-value">{selectedEmployee.company.department}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Role</div>
                <div className="info-value">{selectedEmployee.company.title}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Company</div>
                <div className="info-value">{selectedEmployee.company.name}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
