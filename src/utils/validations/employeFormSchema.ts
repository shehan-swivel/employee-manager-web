import { VALIDATION_RULES } from "@/constants";
import * as yup from "yup";

export const employeeFormSchema = yup.object().shape({
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
