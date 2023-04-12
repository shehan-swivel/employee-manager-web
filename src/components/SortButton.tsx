import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { updateQuery } from "@/store/slices/employeeSlice";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import { Box, ButtonGroup, MenuItem, MenuList, Popover } from "@mui/material";
import type { MouseEvent } from "react";
import React, { useState, useRef } from "react";
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
    dispatch(updateQuery({ ...query, orderBy: value }));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSortDirection = () => {
    const orderNewState = order === "asc" ? "desc" : "asc";
    dispatch(updateQuery({ ...query, order: orderNewState }));
  };

  return (
    <Box ml={3}>
      <ButtonGroup
        color="secondary"
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        sx={{ borderRadius: 50 }}
      >
        <RoundedButton
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select filter property"
          aria-haspopup="menu"
          onClick={handleClick}
        >
          {`Sort By: ${orderBy}`}
        </RoundedButton>
        <RoundedButton onClick={toggleSortDirection}>
          {order === "asc" ? <ArrowUpwardTwoToneIcon /> : <ArrowDownwardTwoToneIcon />}
        </RoundedButton>
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
          {orderByOptions.map((option, index) => (
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
