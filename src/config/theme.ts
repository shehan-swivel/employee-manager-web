import { green, grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["__Inter_9c9965", "__Inter_Fallback_9c9965", "Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#6200ED",
    },
    secondary: {
      main: "#d900ed",
    },
    error: {
      main: red[500],
    },
    success: {
      main: green[600],
    },
    background: {
      default: grey[50],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
