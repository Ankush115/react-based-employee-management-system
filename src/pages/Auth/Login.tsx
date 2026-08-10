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
    <div>
      <h1>
        Employee Management System
      </h1>

      <h2>Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && (
          <p>{error}</p>
        )}

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

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            {...register("password")}
          />

          {errors.password && (
            <p>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;