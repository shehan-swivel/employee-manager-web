import { DEFAULT_IMAGE, GENDER } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useConfirm from "@/hooks/useConfirm";
import { deleteEmployee } from "@/store/slices/employeeSlice";
import { Employee, Gender, TableHeaderCell } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useRouter } from "next/router";
import EnhancedTableHead from "./EnhancedTableHead";

type employeeListProps = {
  employees: Employee[];
};

const headerCells: TableHeaderCell[] = [
  {
    id: "image",
    label: "Image",
    disableSort: true,
  },
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "phoneNumber",
    label: "Phone",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "actions",
    label: "Actions",
    disableSort: true,
  },
];

const EmployeeList = ({ employees }: employeeListProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { confirm } = useConfirm();

  const confirmDelete = async (id: string) => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed) {
      dispatch(deleteEmployee(id));
    }
  };

  const navigateToEditScreen = (id: string) => {
    router.push(`/employee/edit/${id}`);
  };

  if (employees?.length) {
    return (
      <TableContainer component={Paper} elevation={3} aria-label="employee-table">
        <Table sx={{ minHeight: 200 }} aria-label="simple table">
          <EnhancedTableHead headerCells={headerCells} />

          <TableBody>
            {employees.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  <img src={row.photo || DEFAULT_IMAGE} alt="profile photo" loading="lazy" height={60} width={60} />
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email || "-"}</TableCell>
                <TableCell>{row.phoneNumber || "-"}</TableCell>
                <TableCell>{GENDER[row.gender as keyof Gender] || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => navigateToEditScreen(row._id as string)}
                  >
                    Edit
                  </Button>
                  <IconButton color="error" onClick={() => confirmDelete(row._id as string)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return null;
  }
};

export default EmployeeList;
