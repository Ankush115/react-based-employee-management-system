import api from "./api";

export const getEmployees = async () => {
  const response = await api.get("/users");

  return response.data;
};
export const getEmployeeById = async (employeeId: string) => {
  const response = await api.get(`/users/${employeeId}`);

  return response.data;
};
