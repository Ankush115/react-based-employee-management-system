import { useNavigate } from "react-router-dom";
import {
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  employeeSchema,
} from "../../validations/employeeSchema";

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

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<EmployeeFormData>({
  resolver: yupResolver(
    employeeSchema
  ),
});

  const onSubmit = (
    data: EmployeeFormData
  ) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Add Employee</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>First Name</label>

          <input
            {...register("firstName")}
          />

          {errors.firstName && (
  <p>{errors.firstName.message}</p>
)}
        </div>

        <div>
          <label>Last Name</label>

          <input
            {...register("lastName")}
          />

          {errors.lastName && (
  <p>{errors.lastName.message}</p>
)}
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            {...register("email")}
          />

          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Phone</label>

          <input
            {...register("phone")}
          />

          {errors.phone && (
            <p>Phone is required</p>
          )}
        </div>

        <div>
          <label>Age</label>

          <input
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />

          {errors.age && (
            <p>Age is required</p>
          )}
        </div>

        <div>
          <label>Department</label>

          <input
            {...register("department")}
          />

          {errors.department && (
            <p>Department is required</p>
          )}
        </div>

        <div>
          <label>Role</label>

          <input
            {...register("role")}
          />

          {errors.role && (
            <p>Role is required</p>
          )}
        </div>

        <button type="submit">
          Create Employee
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/employees")
          }
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;