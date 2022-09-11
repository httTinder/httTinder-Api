import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserHobbies } from "../../../interfaces/user/user_aditional_data/user_hobbies";

export const hobbiesSchema: SchemaOf<IUserHobbies> = yup.object().shape({
  name: yup.string().required(),
  uuid: yup.string(),
});
