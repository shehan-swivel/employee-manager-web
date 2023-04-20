import SearchOffTwoToneIcon from "@mui/icons-material/SearchOffTwoTone";
import { Box, Typography } from "@mui/material";

type EmptyResultProps = {
  message?: string;
};

const EmptyResult = ({ message = "No data to display" }: EmptyResultProps) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={10}>
      <SearchOffTwoToneIcon fontSize="large" color="disabled" />
      <Typography color="GrayText">{message}</Typography>
    </Box>
  );
};

export default EmptyResult;
