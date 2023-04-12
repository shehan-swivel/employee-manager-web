import { Grid } from "@mui/material";
import EmployeeCard from "./EmployeeCard";
import { Employee } from "@/types";

type employeeGridProps = {
  employees: Employee[];
};

const EmployeeGrid = ({ employees }: employeeGridProps) => {
  if (employees?.length) {
    return (
      <Grid container spacing={4} data-testid="employee-grid">
        {employees.map((emp, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
            <EmployeeCard
              _id={emp._id}
              firstName={emp.firstName}
              lastName={emp.lastName}
              email={emp.email}
              phoneNumber={emp.phoneNumber}
              gender={emp.gender}
              photo={emp.photo}
            />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return null;
  }
};

export default EmployeeGrid;
