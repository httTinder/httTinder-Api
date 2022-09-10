import { IUserEditRequest, IUserRequest } from "./../../interfaces/user/index";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.*])(?=.{8,})/,
    "the password must contain 8 characters, an uppercase, a lowercase, a number and a special character"
  ).required(),
  age: yup.number().required(),
  isAdm: yup.boolean(),
});

export const userEditSchema: SchemaOf<IUserEditRequest> = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  password: yup.string(),
  age: yup.number(),
});
