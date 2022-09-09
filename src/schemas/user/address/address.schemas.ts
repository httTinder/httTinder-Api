import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest } from "../../../interfaces/address";

export const addressRequestSchema: SchemaOf<IAddressRequest> = yup
  .object()
  .shape({
    country: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required(),
    distict: yup.string().required(),
  });
