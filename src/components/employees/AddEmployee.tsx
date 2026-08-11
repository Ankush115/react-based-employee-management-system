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
    <div>
      <h1>Add Employee</h1>

      <EmployeeForm
        loading={actionLoading}
        error={error}
        submitLabel="Create Employee"
        onSubmit={onSubmit}
        onCancel={() => navigate("/employees")}
      />
    </div>
  );
};

export default AddEmployee;
