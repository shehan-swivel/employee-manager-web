import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { hideSnackbar } from "@/store/slices/uiSlice";
import { Alert, Snackbar as MSnackbar } from "@mui/material";

const Snackbar = () => {
  const dispatch = useAppDispatch();
  const { show, message, severity } = useAppSelector((state) => state.ui.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <MSnackbar
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert severity={severity} elevation={10} variant="filled">
        {message}
      </Alert>
    </MSnackbar>
  );
};

export default Snackbar;
