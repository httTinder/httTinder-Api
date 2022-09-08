import { Request,Response } from "express";
import updateRelationShip from "../../../../services/user/user_profile/type_of_relationship/updateTypeOfRelationship";

const updateTypeOfRelationShip = async (req: Request, res: Response) => {

  const id       = req.idParams.id;
  const relation = req.body;

  await updateRelationShip(relation,id);

  return res.json({message:"Relation changed successfully"})


};
export default updateTypeOfRelationShip