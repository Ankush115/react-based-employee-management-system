import api from "./api";

export const getEmployees = async () => {
  const response = await api.get("/users");

  return response.data;
};

export const getEmployeeById = async (
  employeeId: string
) => {
  const response = await api.get(
    `/users/${employeeId}`
  );

  return response.data;
};

export const createEmployee = async (
  employeeData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    department: string;
    role: string;
  }
) => {
  const response = await api.post(
    "/users/add",
    {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      email: employeeData.email,
      phone: employeeData.phone,
      age: employeeData.age,

      company: {
        department:
          employeeData.department,
        title: employeeData.role,
      },
    }
  );

  return response.data;
};