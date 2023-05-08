import { Employee } from "@/types";
import { Grid } from "@mui/material";
import EmployeeCard from "../molecules/EmployeeCard";
import EmptyResult from "../molecules/EmptyResult";

type EmployeeGridProps = {
  employees: Employee[];
};

const EmployeeGrid = ({ employees }: EmployeeGridProps) => {
  if (employees?.length) {
    return (
      <Grid container spacing={4} data-testid="employee-grid">
        {employees.map((emp) => (
          <Grid key={emp._id} item xs={12} sm={6} md={4} lg={3}>
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
    return <EmptyResult />;
  }
};

export default EmployeeGrid;
