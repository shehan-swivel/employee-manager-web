import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateQuery } from "@/store/slices/employeeSlice";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import SortTwoToneIcon from "@mui/icons-material/SortTwoTone";
import { Box, ButtonGroup, MenuItem, MenuList, Popover } from "@mui/material";
import { MouseEvent, useMemo, useRef, useState } from "react";
import RoundedButton from "./RoundedButton";

const SortButton = () => {
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

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value: string) => {
    dispatch(updateQuery({ ...query, orderBy: value, order: order || "asc" }));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSortDirection = () => {
    const orderNewState = order === "asc" ? "desc" : "asc";
    dispatch(updateQuery({ ...query, order: orderNewState }));
  };

  const orderByText = useMemo(() => {
    return orderByOptions.find((el) => el.value === orderBy)?.label;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy]);

  return (
    <Box ml={3}>
      <ButtonGroup
        variant="contained"
        color="secondary"
        ref={anchorRef}
        aria-label="split button"
        sx={{ borderRadius: 50 }}
      >
        <RoundedButton
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select filter property"
          aria-haspopup="menu"
          startIcon={<SortTwoToneIcon />}
          onClick={handleClick}
        >
          {orderBy ? `Sort by : ${orderByText}` : "Sort by (Default)"}
        </RoundedButton>
        {!!orderBy && (
          <RoundedButton onClick={toggleSortDirection}>
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
