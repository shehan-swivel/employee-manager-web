import { EmployeeQuery } from "@/types";
import apiService from "./apiService";

const PREFIX = "/employees";

export const employeeService = {
  getEmployees,
};

function getEmployees(queryParams: EmployeeQuery) {
  const params = { ...queryParams };
  return apiService.get(`${PREFIX}`, { params });
}
