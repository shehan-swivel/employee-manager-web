import EmployeeGrid from "@/components/EmployeeGrid";
import EmployeeList from "@/components/EmployeeList";
import FilterButton from "@/components/FilterButton";
import RoundedButton from "@/components/RoundedButton";
import SortButton from "@/components/SortButton";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { wrapper } from "@/store";
import { getEmployees } from "@/store/slices/employeeSlice";
import AppsIcon from "@mui/icons-material/Apps";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Fab } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EmployeeHome = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.all.data);
  const query = useAppSelector((state) => state.employees.query);
  const { firstName, lastName, email, gender, phoneNumber, order, orderBy } = query;

  const [isListView, setIsListView] = useState(false);

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

  useEffect(() => {
    // If changed sorting parameters, fetch sorted data from the server
    dispatch(getEmployees({ firstName, lastName, email, gender, phoneNumber, orderBy, order }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, gender, phoneNumber, orderBy, order]);

  return (
    <>
      <Head>
        <title>Employee Manager | Home</title>
      </Head>

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box display="flex">
          <FilterButton />
          <SortButton />
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

      {renderContent()}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(getEmployees());

  return {
    props: {},
  };
});

export default EmployeeHome;
