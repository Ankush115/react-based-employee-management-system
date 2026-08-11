import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
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
  onSubmit: (data: EmployeeFormData) => void | Promise<void>;
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
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeSchema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  return (
    <form className="employee-form" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="form-server-error">{error}</p>}

      {/* First Name */}
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="firstName">First Name</label>

          <input id="firstName" type="text" {...register("firstName")} />

          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>

          <input id="lastName" type="text" {...register("lastName")} />

          {errors.lastName && (
            <p className="form-error">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email">Email</label>

          <input id="email" type="email" {...register("email")} />

          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div className="form-field">
          <label htmlFor="phone">Phone</label>

          <input id="phone" type="tel" {...register("phone")} />

          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        {/* Age */}
        <div className="form-field">
          <label htmlFor="age">Age</label>

          <input
            id="age"
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />

          {errors.age && <p className="form-error">{errors.age.message}</p>}
        </div>

        {/* Department */}
        <div className="form-field">
          <label htmlFor="department">Department</label>

          <input id="department" type="text" {...register("department")} />

          {errors.department && <p>{errors.department.message}</p>}
        </div>

        {/* Role */}
        <div className="form-field">
          <label htmlFor="role">Role</label>

          <input id="role" type="text" {...register("role")} />

          {errors.role && <p className="form-error">{errors.role.message}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="submit" disabled={loading} className="primary-button">
          {loading ? "Saving..." : submitLabel}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="secondary-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
