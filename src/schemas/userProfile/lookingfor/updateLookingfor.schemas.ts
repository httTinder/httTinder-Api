import * as yup from "yup";
import { SchemaOf } from "yup";
import { ILookingFor } from "../../../interfaces/looking_for";

export const lookingForSchema: SchemaOf<ILookingFor> = yup.object().shape({
  age: yup.string(),
  gender: yup.string(),
  zodiac: yup.string(),
  location: yup.string(),
  kids: yup.boolean(),
  smoker: yup.boolean(),
  pets: yup.boolean(),
  education: yup.string(),
});
