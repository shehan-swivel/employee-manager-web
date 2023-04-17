import { Employee, EmployeeQuery } from "@/types";
import apiService from "./apiService";

const PREFIX = "/employees";

export const employeeService = {
  getEmployees,
  createEmployee,
};

function getEmployees(queryParams: EmployeeQuery) {
  const params = { ...queryParams };
  return apiService.get(`${PREFIX}`, { params });
}

function createEmployee(data: Employee) {
  return apiService.post(`${PREFIX}`, data);
}
