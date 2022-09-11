import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserProfileUpdateRequest } from "../../interfaces/user/user_profile";

export const updateUserProfileSchema: SchemaOf<IUserProfileUpdateRequest> = yup
  .object()
  .shape({
    orientation: yup.string(),
    gender: yup.string(),
    bio: yup.string(),
    height: yup.string(),
    profileImage: yup.string(),
    education: yup.string(),
    profession: yup.string(),
  });
