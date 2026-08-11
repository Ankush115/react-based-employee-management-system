import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import {
  useAppDispatch,
  useAppSelector,
} from "../../store/hooks";

import { login } from "../../store/slices/authSlice";

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),

  password: yup
    .string()
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    loading,
    error,
  } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      await dispatch(
        login(data)
      ).unwrap();

      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="page-header">
          <div>
            <h1>Employee Management System</h1>
            <p className="page-subtitle">Sign in to manage your team, departments, and employees.</p>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit(onSubmit)}>
          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-input" id="email" type="email" {...register("email")} />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input className="form-input" id="password" type="password" {...register("password")} />
            {errors.password && <p className="form-error">{errors.password.message}</p>}
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;