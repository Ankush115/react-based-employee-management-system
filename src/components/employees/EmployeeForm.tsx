import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { employeeSchema } from "../../validations/employeeSchema";

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  role: string;
}

interface EmployeeFormProps {
  initialValues?: EmployeeFormData;
  loading?: boolean;
  error?: string | null;
  submitLabel?: string;
  onSubmit: (
    data: EmployeeFormData
  ) => void | Promise<void>;
  onCancel: () => void;
}

const EmployeeForm = ({
  initialValues,
  loading = false,
  error,
  submitLabel = "Save Employee",
  onSubmit,
  onCancel,
}: EmployeeFormProps) => {
 const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeSchema),
    defaultValues: initialValues,
  });

  return (
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
            ? "Saving..."
            : submitLabel}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;