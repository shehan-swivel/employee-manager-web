import { GENDER, VALIDATION_RULES } from "@/constants";
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
import * as yup from "yup";
import RoundedButton from "./RoundedButton";
import SpinnerIcon from "./SpinnerIcon";

type employeeFormProps = {
  isEdit: boolean;
  defaultValues: Employee;
  onSubmit: SubmitHandler<Employee>;
};

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(VALIDATION_RULES.ALPHABETS_ONLY, "First name must contains only alphabets")
    .min(6, "First Name must be at least 6 characters")
    .max(10, "First Name must be at most 10 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .matches(VALIDATION_RULES.ALPHABETS_ONLY, "Last name must contains only alphabets")
    .min(6, "Last Name must be at least 6 characters")
    .max(10, "Last Name must be at most 10 characters"),
  email: yup.string().matches(VALIDATION_RULES.EMAIL, { message: "Invalid email address", excludeEmptyString: true }),
  phoneNumber: yup
    .string()
    .matches(VALIDATION_RULES.LK_PHONE_NUMBERS, { message: "Invalid phone number", excludeEmptyString: true }),
  gender: yup.string(),
});

const EmployeeForm = ({ isEdit, defaultValues, onSubmit }: employeeFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const isSubmitting = useAppSelector((state) => state.employees.submit.loading);

  const navigateToHomeScreen = () => {
    router.push("/employee/list");
  };

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
                  type="email"
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
              <RoundedButton type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 3, width: 100 }}>
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
