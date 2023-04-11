import { createTheme } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["__Inter_9c9965", "__Inter_Fallback_9c9965", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#6200ED",
    },
    error: {
      main: red[500],
    },
    success: {
      main: green[600],
    },
  },
});

export default theme;
