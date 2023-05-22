import { GENDER } from "@/constants";
import useAppSelector from "@/hooks/useAppSelector";
import { Employee } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RoundedButton from "../atoms/RoundedButton";
import SpinnerIcon from "../atoms/SpinnerIcon";
import { employeeFormSchema } from "@/utils/validations";

type EmployeeFormProps = {
  isEdit: boolean;
  defaultValues: Employee;
  onSubmit: SubmitHandler<Employee>;
};

const EmployeeForm = ({ isEdit, defaultValues, onSubmit }: EmployeeFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues,
    resolver: yupResolver(employeeFormSchema),
  });

  const router = useRouter();
  const isSubmitting = useAppSelector((state) => state.employees.submit.loading);

  // Navigates to the home screen
  const navigateToHomeScreen = () => {
    router.push("/employee/list");
  };

  // Set title, buttonLabel values based on the isEdit prop
  const [title, buttonLabel] = useMemo(() => {
    if (isEdit) {
      return ["Edit Employee", "Save"];
    } else {
      return ["Add Employee", "Add"];
    }
  }, [isEdit]);

  return (
    <Box m="auto" display="flex" flexDirection="column" alignItems="center" maxWidth={500}>
      <RoundedButton variant="contained" sx={{ ml: "auto", mb: 3 }} onClick={navigateToHomeScreen}>
        List View
      </RoundedButton>

      <Card elevation={3}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" align="center">
            {title}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  {...field}
                  fullWidth
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName?.message}
                  helperText={errors.firstName?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  {...field}
                  fullWidth
                  label="Last Name"
                  error={!!errors.lastName?.message}
                  helperText={errors.lastName?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  {...field}
                  fullWidth
                  label="Email"
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  {...field}
                  fullWidth
                  label="Phone"
                  error={!!errors.phoneNumber?.message}
                  helperText={errors.phoneNumber?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant="filled">
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    {...field}
                    labelId="gender-label"
                    defaultValue=""
                    label="Gender"
                    error={!!errors.gender?.message}
                  >
                    {Object.entries(GENDER).map(([value, label]) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Box display="flex" justifyContent="flex-end">
              <RoundedButton
                id="employee-form-submit-btn"
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, width: 100 }}
              >
                {isSubmitting ? <SpinnerIcon /> : buttonLabel}
              </RoundedButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeForm;
