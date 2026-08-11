import * as yup from "yup";

export const employeeSchema =
  yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(
        2,
        "First name must be at least 2 characters"
      ),

    lastName: yup
      .string()
      .required("Last name is required")
      .min(
        2,
        "Last name must be at least 2 characters"
      ),

    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),

    phone: yup
      .string()
      .required("Phone is required"),

    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required")
      .min(18, "Employee must be at least 18")
      .max(
        100,
        "Please enter a valid age"
      ),

    department: yup
      .string()
      .required("Department is required"),

    role: yup
      .string()
      .required("Role is required"),
    company: yup
      .string()
      .required("Company is required"),
  });