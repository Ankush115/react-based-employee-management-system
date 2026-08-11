import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { addEmployee } from "../../store/slices/employeeSlice";

import EmployeeForm, { type EmployeeFormData } from "./EmployeeForm";

const AddEmployee = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { actionLoading, error } = useAppSelector((state) => state.employees);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await dispatch(addEmployee(data)).unwrap();

      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-shell">
      <div className="content-card">
        <div className="page-header">
          <div>
            <h1>Add Employee</h1>
            <p className="page-subtitle">Create a new employee profile and add them to your roster.</p>
          </div>
        </div>

        <EmployeeForm
          loading={actionLoading}
          error={error}
          submitLabel="Create Employee"
          onSubmit={onSubmit}
          onCancel={() => navigate("/employees")}
        />
      </div>
    </div>
  );
};

export default AddEmployee;
