import api from "./api";
import type { EmployeeResponse } from "../types/api";

export const getEmployees = async (): Promise<EmployeeResponse> => {
  const response = await api.get<EmployeeResponse>("/users");

  return response.data;
};