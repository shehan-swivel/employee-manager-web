import EmployeeGrid from "@/components/EmployeeGrid";
import EmployeeList from "@/components/EmployeeList";
import FilterBar from "@/components/FilterBar";
import RoundedButton from "@/components/RoundedButton";
import SortButton from "@/components/SortButton";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import useDebounce from "@/hooks/useDebounce";
import { wrapper } from "@/store";
import { getEmployees } from "@/store/slices/employeeSlice";
import AppsIcon from "@mui/icons-material/Apps";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Avatar, Box, Collapse, Fab, Typography, useTheme } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const EmployeeHome = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.all.data);
  const query = useAppSelector((state) => state.employees.query);
  const debouncedQuery = useDebounce(query, 300);

  const [isListView, setIsListView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const changeLayout = () => {
    setIsListView(!isListView);
  };

  const navigateToAddScreen = () => {
    router.push("/employee/add");
  };

  const renderContent = () => {
    if (isListView) {
      return <EmployeeList employees={employees} />;
    } else {
      return <EmployeeGrid employees={employees} />;
    }
  };

  const filtersCount = useMemo(() => {
    return Object.entries(query).filter(([key, value]) => key !== "orderBy" && key !== "order" && value).length;
  }, [query]);

  useEffect(() => {
    dispatch(getEmployees(debouncedQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <>
      <Head>
        <title>Employee Manager | Home</title>
      </Head>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <RoundedButton
            variant="contained"
            startIcon={<FilterButtonStartIcon count={filtersCount} />}
            endIcon={showFilters ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
            color="secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filter
          </RoundedButton>
          {!isListView && <SortButton />}
        </Box>

        <Box display="flex" alignItems="center">
          <RoundedButton variant="contained" sx={{ mr: 2 }} onClick={navigateToAddScreen}>
            Add Employee
          </RoundedButton>
          <Fab color="primary" size="small" onClick={changeLayout} title="Switch Layout">
            {isListView ? <AppsIcon /> : <ViewListIcon />}
          </Fab>
        </Box>
      </Box>

      <Collapse in={showFilters} sx={{ height: showFilters ? "auto" : "0px" }}>
        <FilterBar />
      </Collapse>

      {renderContent()}
    </>
  );
};

const FilterButtonStartIcon = ({ count }: { count: number }) => {
  const theme = useTheme();

  if (count) {
    return (
      <Avatar sx={{ width: 20, height: 20, bgcolor: theme.palette.common.white }}>
        <Typography variant="button" sx={{ color: theme.palette.secondary.main }}>
          {count}
        </Typography>
      </Avatar>
    );
  } else {
    return <FilterAltTwoToneIcon />;
  }
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getEmployees());

  return {
    props: {},
  };
});

export default EmployeeHome;
