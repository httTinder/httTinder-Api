import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserSession } from "../../interfaces/user/userSession";

export const sessionSchema: SchemaOf<IUserSession> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
