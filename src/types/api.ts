
import type { Employee } from "./employee";

export interface EmployeeResponse {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
}