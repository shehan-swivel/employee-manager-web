import styles from "@/styles/Footer.module.css";
import { Paper, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Paper className={styles.container} component="footer" variant="outlined" elevation={0} square>
      <Typography textAlign="center" variant="caption" component="h6">
        {new Date().getFullYear()} - <strong>Employee Manager</strong>
      </Typography>
    </Paper>
  );
};

export default Footer;
