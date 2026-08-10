import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { employeeSchema } from "../../validations/employeeSchema";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

import { addEmployee } from "../../store/slices/employeeSlice";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  role: string;
}

const AddEmployee = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    loading,
    error,
  } = useAppSelector(
    (state) => state.employees
  );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeSchema),
  });

  const onSubmit = async (
    data: EmployeeFormData
  ) => {
    try {
      await dispatch(
        addEmployee(data)
      ).unwrap();

      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <p>{error}</p>
        )}

        {/* First Name */}
        <div>
          <label htmlFor="firstName">
            First Name
          </label>

          <input
            id="firstName"
            type="text"
            {...register("firstName")}
          />

          {errors.firstName && (
            <p>
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName">
            Last Name
          </label>

          <input
            id="lastName"
            type="text"
            {...register("lastName")}
          />

          {errors.lastName && (
            <p>
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <p>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone">
            Phone
          </label>

          <input
            id="phone"
            type="tel"
            {...register("phone")}
          />

          {errors.phone && (
            <p>
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age">
            Age
          </label>

          <input
            id="age"
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />

          {errors.age && (
            <p>
              {errors.age.message}
            </p>
          )}
        </div>

        {/* Department */}
        <div>
          <label htmlFor="department">
            Department
          </label>

          <input
            id="department"
            type="text"
            {...register("department")}
          />

          {errors.department && (
            <p>
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role">
            Role
          </label>

          <input
            id="role"
            type="text"
            {...register("role")}
          />

          {errors.role && (
            <p>
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div>
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Employee"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/employees")
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;