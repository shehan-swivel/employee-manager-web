import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateQuery } from "@/store/slices/employeeSlice";
import { EmployeeQuery } from "@/types";
import { GENDER } from "@/utils/enums";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";
import RoundedButton from "./RoundedButton";

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((store) => store.employees.query);

  const { firstName, lastName, email, phoneNumber, gender } = query;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const filtersCount = useMemo(() => {
    return Object.entries(query).filter(([key, value]) => key !== "orderBy" && key !== "order" && value).length;
  }, [query]);

  return (
    <Box>
      <RoundedButton
        color="secondary"
        // variant={filtersCount ? "contained" : "outlined"}
        variant="contained"
        startIcon={<FilterAltTwoToneIcon />}
        endIcon={<FilterButtonEndIcon count={filtersCount} />}
        onClick={handleClick}
      >
        Filter
      </RoundedButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={4} sx={{ width: 360 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Filters</Typography>
            <Button variant="text" size="small" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="first-name-filter"
                label="First Name"
                size="small"
                value={firstName}
                fullWidth
                onChange={(e) => handleOnChange(e, "firstName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="last-name-filter"
                label="Last Name"
                variant="outlined"
                size="small"
                value={lastName}
                fullWidth
                onChange={(e) => handleOnChange(e, "lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email-filter"
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                fullWidth
                onChange={(e) => handleOnChange(e, "email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="phone-number-filter"
                label="Phone Number"
                variant="outlined"
                size="small"
                value={phoneNumber}
                fullWidth
                onChange={(e) => handleOnChange(e, "phoneNumber")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="gender-filter-label">Gender</InputLabel>
                <Select
                  id="gender-filter"
                  labelId="gender-filter-label"
                  label="Gender"
                  value={gender}
                  fullWidth
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
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

const FilterButtonEndIcon = ({ count }: { count: number }) => {
  const theme = useTheme();

  if (count) {
    return (
      <Avatar sx={{ width: 20, height: 20, bgcolor: theme.palette.common.white }}>
        <Typography variant="button" sx={{ color: theme.palette.primary.main }}>
          {count}
        </Typography>
      </Avatar>
    );
  } else {
    return null;
  }
};

export default FilterBar;
