import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserAddDataRequest } from "./../../interfaces/user/user_additionalData/index";

const userAddDataSchema: SchemaOf<IUserAddDataRequest> = yup.object().shape({
  zodiac: yup.string(),
  drinker: yup.boolean(),
  smoker: yup.boolean(),
  kids: yup.boolean(),
  kidsQnt: yup.string(),
});

export { userAddDataSchema };
