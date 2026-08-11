import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { employeeSchema } from "../../validations/employeeSchema";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { addEmployee } from "../../store/slices/employeeSlice";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  department: string;
  role: string;
  company: string;
  birthDate: string;
}

const AddEmployee = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.employees);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeSchema),
  });

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
            <p className="page-subtitle">
              Create a new team member and add them to your employee roster.
            </p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
          {error && <p className="form-error">{error}</p>}

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                className="form-input"
                id="firstName"
                type="text"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="form-error">{errors.firstName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="form-input"
                id="lastName"
                type="text"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="form-error">{errors.lastName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                className="form-input"
                id="phone"
                type="tel"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="form-error">{errors.phone.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="age">
                Age
              </label>
              <input
                className="form-input"
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && <p className="form-error">{errors.age.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="department">
                Department
              </label>
              <input
                className="form-input"
                id="department"
                type="text"
                {...register("department")}
              />
              {errors.department && (
                <p className="form-error">{errors.department.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="role">
                Role
              </label>
              <input
                className="form-input"
                id="role"
                type="text"
                {...register("role")}
              />
              {errors.role && (
                <p className="form-error">{errors.role.message}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="company">
                Company Name
              </label>
              <input
                className="form-input"
                id="company"
                type="text"
                {...register("company")}
              />
              {errors.company && (
                <p className="form-error">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Employee"}
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
