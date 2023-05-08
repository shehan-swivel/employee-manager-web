import EmployeeForm from "@/components/organisms/EmployeeForm";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { wrapper } from "@/store";
import { getEmployeeById, updateEmployee } from "@/store/slices/employeeSlice";
import { Employee } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const employee = useAppSelector((state) => state.employees.selected.data);
  const submitState = useAppSelector((state) => state.employees.submit);

  const { _id, firstName, lastName, email, phoneNumber, gender } = employee;
  const defaultValues = { firstName, lastName, email, phoneNumber, gender };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: Employee) => {
    setIsSubmitting(true);
    if (_id) {
      dispatch(updateEmployee({ id: _id, data }));
    }
  };

  useEffect(() => {
    if (isSubmitting && !submitState.loading && submitState.success) {
      router.push("/employee/list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitState, isSubmitting]);

  return (
    <>
      <Head>
        <title>Employee Manager | Edit Employee</title>
      </Head>
      <EmployeeForm isEdit={true} defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const id = params?.id as string;
  await store.dispatch(getEmployeeById(id));

  return {
    props: {},
  };
});

export default EditForm;
