import * as yup from "yup";
import { SchemaOf } from "yup";
import { IRelationship } from "../../../../interfaces/relationship";

export const relationshipSchema: SchemaOf<IRelationship> = yup.object().shape({
  friendship: yup.boolean().required(),
  casual: yup.boolean().required(),
  serious: yup.boolean().required(),
});
