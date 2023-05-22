import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateQuery } from "@/store/slices/employeeSlice";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import SortTwoToneIcon from "@mui/icons-material/SortTwoTone";
import { Box, ButtonGroup, MenuItem, MenuList, Popover, useMediaQuery, useTheme } from "@mui/material";
import { MouseEvent, useMemo, useRef, useState } from "react";
import RoundedButton from "../atoms/RoundedButton";

const SortButton = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const query = useAppSelector((store) => store.employees.query);

  const { orderBy, order } = query;
  const orderByOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "phoneNumber" },
    { label: "Gender", value: "gender" },
  ];

  const anchorRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  // Set anchor element for the Popover component
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Update the order by value
  const handleMenuItemClick = (value: string) => {
    dispatch(updateQuery({ ...query, orderBy: value, order: order || "asc" }));
    handleClose();
  };

  // Set anchor element as null when close the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Toggle sort direction and update the order value
  const toggleSortDirection = () => {
    const orderNewState = order === "asc" ? "desc" : "asc";
    dispatch(updateQuery({ ...query, order: orderNewState }));
  };

  // Get the sort button's label when changing the orderBy value
  const orderByText = useMemo(() => {
    return orderByOptions.find((el) => el.value === orderBy)?.label;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy]);

  return (
    <Box>
      <ButtonGroup
        variant="contained"
        color="secondary"
        ref={anchorRef}
        aria-label="split button"
        size={isMobileScreen ? "small" : "medium"}
        sx={{ borderRadius: 50 }}
      >
        <RoundedButton
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select filter property"
          aria-haspopup="menu"
          title="Sort by"
          startIcon={<SortTwoToneIcon />}
          onClick={handleClick}
        >
          {orderBy ? `Sort by : ${orderByText}` : "Sort by (Default)"}
        </RoundedButton>
        {!!orderBy && (
          <RoundedButton onClick={toggleSortDirection} title="Sort direction">
            <>
              <ArrowUpwardTwoToneIcon fontSize="small" color={order === "asc" ? "inherit" : "disabled"} />
              <ArrowDownwardTwoToneIcon fontSize="small" color={order === "asc" ? "disabled" : "inherit"} />
            </>
          </RoundedButton>
        )}
      </ButtonGroup>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: { width: 180 },
        }}
      >
        <MenuList id="split-button-menu" autoFocusItem>
          <MenuItem key="default" selected={orderBy === ""} onClick={() => handleMenuItemClick("")}>
            Sort by (Default)
          </MenuItem>
          {orderByOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={orderBy === option.value}
              onClick={() => handleMenuItemClick(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </Box>
  );
};

export default SortButton;
