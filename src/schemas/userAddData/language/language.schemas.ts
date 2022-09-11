import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserLanguage } from "../../../interfaces/user/user_aditional_data/user_languages";

export const languageSchema: SchemaOf<IUserLanguage> = yup.object().shape({
  language: yup.string().required(),
  uuid: yup.string(),
});
