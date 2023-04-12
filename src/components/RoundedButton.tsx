import type { ButtonProps } from "@mui/material";
import { Button } from "@mui/material";

const RoundedButton = ({ children, sx, ...otherProps }: ButtonProps) => {
  return (
    <Button {...otherProps} sx={{ ...sx, borderRadius: 50 }}>
      {children}
    </Button>
  );
};

export default RoundedButton;
