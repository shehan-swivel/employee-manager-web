import { GENDER } from "@/constants";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateQuery } from "@/store/slices/employeeSlice";
import { EmployeeQuery } from "@/types";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import type { ChangeEvent } from "react";

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((store) => store.employees.query);

  const { firstName, lastName, email, phoneNumber, gender } = query;

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
    field: keyof EmployeeQuery
  ) => {
    dispatch(updateQuery({ ...query, [field]: event.target.value }));
  };

  const clearFilters = () => {
    const defaultFilters = { firstName: "", lastName: "", email: "", phoneNumber: "", gender: "" };
    dispatch(updateQuery({ ...query, ...defaultFilters }));
  };

  return (
    <Paper sx={{ mb: 3, p: 2, backgroundColor: grey["200"] }} elevation={0} data-testid="filter-bar">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            id="first-name-filter"
            label="First Name"
            size="small"
            value={firstName}
            fullWidth
            placeholder="Search..."
            onChange={(e) => handleOnChange(e, "firstName")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            id="last-name-filter"
            label="Last Name"
            variant="outlined"
            size="small"
            value={lastName}
            fullWidth
            placeholder="Search..."
            onChange={(e) => handleOnChange(e, "lastName")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            id="email-filter"
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            fullWidth
            placeholder="Search..."
            onChange={(e) => handleOnChange(e, "email")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            id="phone-number-filter"
            label="Phone"
            variant="outlined"
            size="small"
            value={phoneNumber}
            fullWidth
            placeholder="Search..."
            onChange={(e) => handleOnChange(e, "phoneNumber")}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="gender-filter-label">Gender</InputLabel>
            <Select
              id="gender-filter"
              labelId="gender-filter-label"
              label="Gender"
              value={gender}
              fullWidth
              placeholder="Select"
              onChange={(e) => handleOnChange(e, "gender")}
            >
              <MenuItem value="">
                <em>none</em>
              </MenuItem>
              {Object.entries(GENDER).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Button variant="text" fullWidth onClick={clearFilters}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterBar;
