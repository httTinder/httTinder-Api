import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserMusic } from "../../../interfaces/user/user_aditional_data/user_music";

export const musicSchema: SchemaOf<IUserMusic> = yup.object().shape({
  music: yup.string().required(),
  uuid: yup.string(),
});
