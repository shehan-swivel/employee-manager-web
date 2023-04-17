import { Employee, EmployeeQuery } from "@/types";
import apiService from "./apiService";

const PREFIX = "/employees";

export const employeeService = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

function getEmployees(queryParams: EmployeeQuery) {
  const params = { ...queryParams };
  return apiService.get(`${PREFIX}`, { params });
}

function createEmployee(data: Employee) {
  return apiService.post(`${PREFIX}`, data);
}

function getEmployeeById(id: string) {
  return apiService.get(`${PREFIX}/${id}`);
}

function updateEmployee(id: string, data: Employee) {
  return apiService.put(`${PREFIX}/${id}`, data);
}

function deleteEmployee(id: string) {
  return apiService.delete(`${PREFIX}/${id}`);
}
