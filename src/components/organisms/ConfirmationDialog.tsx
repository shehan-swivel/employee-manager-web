import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import useConfirm from "../../hooks/useConfirm";

const ConfirmationDialog = () => {
  const { onConfirm, onCancel, show, message } = useConfirm();

  return (
    <Dialog open={show} onClose={onCancel} maxWidth="xs" PaperProps={{ sx: { p: 2 } }}>
      <Box display="flex" justifyContent="center" sx={{ fontSize: 48 }}>
        <ErrorTwoToneIcon color="error" fontSize="inherit" />
      </Box>

      <DialogTitle align="center" fontWeight="bold" variant="subtitle1">
        {message}
      </DialogTitle>

      <DialogActions>
        <Button onClick={onCancel} color="inherit" variant="outlined" fullWidth>
          No
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disableElevation fullWidth>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
