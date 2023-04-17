export type Gender = {
  M: "Male";
  F: "Female";
};

export type Employee = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  photo?: string;
};

export type TableHeaderCell = {
  id: string;
  label: string;
  disableSort?: boolean;
};

export type EmployeeQuery = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  orderBy?: string;
  order?: string;
};
