import { Employee, EmployeeQuery } from "@/types";
import apiService from "./apiService";

const PREFIX = "/v1/employees";

export const employeeService = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

/**
 * Get employee list
 * @param {EmployeeQuery} queryParams
 */
function getEmployees(queryParams: EmployeeQuery) {
  const params = { ...queryParams };
  return apiService.get(`${PREFIX}`, { params });
}

/**
 * Create a new employee
 * @param {Employee} data
 */
function createEmployee(data: Employee) {
  return apiService.post(`${PREFIX}`, data);
}

/**
 * Get an employee by employee id
 * @param {string} id
 */
function getEmployeeById(id: string) {
  return apiService.get(`${PREFIX}/${id}`);
}

/**
 * Update an employee
 * @param {string} id
 * @param {Employee} data
 */
function updateEmployee(id: string, data: Employee) {
  return apiService.put(`${PREFIX}/${id}`, data);
}

/**
 * Delete an employee
 * @param {string} id
 */
function deleteEmployee(id: string) {
  return apiService.delete(`${PREFIX}/${id}`);
}
