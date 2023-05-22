import { DEFAULT_IMAGE, GENDER } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useConfirm from "@/hooks/useConfirm";
import { deleteEmployee } from "@/store/slices/employeeSlice";
import { Employee, Gender } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import { useRouter } from "next/router";

const EmployeeCard = ({ _id, firstName, lastName, email, phoneNumber, gender, photo }: Employee) => {
  const router = useRouter();
  const { confirm } = useConfirm();
  const dispatch = useAppDispatch();

  // Get user confirmation before delete
  const confirmDelete = async () => {
    const isConfirmed = await confirm("Are you sure you want to delete this record ?");

    if (isConfirmed && _id) {
      dispatch(deleteEmployee(_id));
    }
  };

  // Navigates to the employee edit screen
  const navigateToEditScreen = () => {
    router.push(`/employee/edit/${_id}`);
  };

  return (
    <Card elevation={3}>
      <CardMedia sx={{ height: 180 }} image={photo ?? DEFAULT_IMAGE} />
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>{`${firstName} ${lastName}`}</Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {email || "-"}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <div>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {phoneNumber || "-"}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {GENDER[gender as keyof Gender] || "-"}
            </Typography>
          </div>
          <div>
            <Fab color="error" size="small" sx={{ mr: 1, boxShadow: 2 }} onClick={confirmDelete}>
              <DeleteIcon />
            </Fab>
            <Fab color="success" size="small" sx={{ boxShadow: 2 }} onClick={navigateToEditScreen}>
              <EditIcon />
            </Fab>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
