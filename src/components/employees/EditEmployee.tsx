import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { fetchEmployeeById } from "../../store/slices/employeeSlice";

import { employeeSchema } from "../../validations/employeeSchema";

import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import { updateEmployee } from "../../store/slices/employeeSlice";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  role: string;
}

const EditEmployee = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { selectedEmployee, loading, error } = useAppSelector(
    (state) => state.employees,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeSchema),
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedEmployee) {
      reset({
        firstName: selectedEmployee.firstName,

        lastName: selectedEmployee.lastName,

        email: selectedEmployee.email,

        phone: selectedEmployee.phone,

        age: selectedEmployee.age,

        department: selectedEmployee.company.department,

        role: selectedEmployee.company.title,
      });
    }
  }, [selectedEmployee, reset]);

  const onSubmit = async (
  data: EmployeeFormData
) => {
  if (!id) {
    console.error("Employee ID is missing");
    return;
  }

  console.log("Submitting:", {
    employeeId: id,
    employeeData: data,
  });

  try {
    const result = await dispatch(
      updateEmployee({
        employeeId: id,
        employeeData: data,
      })
    ).unwrap();

    console.log("Update successful:", result);

    navigate(`/employees/${id}`);
  } catch (error) {
    console.error("Update failed:", error);
  }
};

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
      <h1>Edit Employee</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div>
          <label htmlFor="firstName">First Name</label>

          <input id="firstName" type="text" {...register("firstName")} />

          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName">Last Name</label>

          <input id="lastName" type="text" {...register("lastName")} />

          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>

          <input id="email" type="email" {...register("email")} />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone">Phone</label>

          <input id="phone" type="tel" {...register("phone")} />

          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age">Age</label>

          <input
            id="age"
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />

          {errors.age && <p>{errors.age.message}</p>}
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department">Department</label>

          <input id="department" type="text" {...register("department")} />

          {errors.department && <p>{errors.department.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role">Role</label>

          <input id="role" type="text" {...register("role")} />

          {errors.role && <p>{errors.role.message}</p>}
        </div>

        {/* Actions */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Employee"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/employees/${selectedEmployee.id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
