import { Request,Response } from "express";

import deleterelationShipService from "../../../../services/user/user_profile/type_of_relationship/deleteTypeOfRelation.service";

const deleteRelationShipController = async(req:Request,res:Response)=>{

    const id = req.idParams.id

    await deleterelationShipService(id);

    return res.status(204).json({
        message: "Relation delete successfully",
      });
}

export default deleteRelationShipController