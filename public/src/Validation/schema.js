import * as yup from "yup";
export const userScehma = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
});
