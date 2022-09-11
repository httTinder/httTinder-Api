import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserPets } from "../../../interfaces/user/user_additionalData/pets";

export const petsSchema: SchemaOf<IUserPets> = yup.object().shape({
  specie: yup.string().required(),
  uuid: yup.string(),
});
