import EmployeeForm from "@/components/EmployeeForm";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import { createEmployee } from "@/store/slices/employeeSlice";
import { Employee } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const defaultValues: Employee = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "",
};

const AddForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const submitState = useAppSelector((state) => state.employees.submit);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: Employee) => {
    setIsSubmitting(true);
    dispatch(createEmployee(data));
  };

  useEffect(() => {
    if (isSubmitting && !submitState.loading && submitState.success) {
      router.push("/employee/list");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitState]);

  return (
    <>
      <Head>
        <title>Employee Manager | Add Employee</title>
      </Head>
      <EmployeeForm isEdit={false} defaultValues={defaultValues} onSubmit={onSubmit} />
    </>
  );
};

export default AddForm;
