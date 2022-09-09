import { updateLookingForController } from "../controllers/user/user_profile/looking_for/updateLookingFor.controller";
import { Router } from "express";
import { userListController } from "../controllers/user/userList.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdmin.middleware";
import { userEditController } from "../controllers/user/userEdit.controller";
import activateUserController from "../controllers/user/active_user.controller";
import createUserController from "../controllers/user/create_user.controller";
import { verifyActiveMiddleware } from "../middlewares/verifyActive.middleware";
import { adminPermission } from "../middlewares/adminPermission.middleware";
import userDeleteController from "../controllers/user/userDelete.controller";
import listUsersController from "../controllers/user/list_user.controller";
import { editUserMiddleWare } from "../middlewares/editUser.middleware";
import { upload } from "../utils/cloudinary.utils";
import { imageEditController } from "../controllers/user/user_profile/user_images/editImage.controller";
import updateUserAddressController from "../controllers/user/user_address/update_user_address.controller";
import userDeleteAddressController from "../controllers/user/user_address/delete_user_address.controller";
import { verifyIdMiddleware } from "../middlewares/verifyId.middleware";
import { imageHeadersMiddleware } from "../middlewares/user/user_profile/user_images/emptyBody.middleware";
import { imageDeleteController } from "../controllers/user/user_profile/user_images/deleteImage.controller";
import { uuidMiddleware } from "../middlewares/user/user_profile/user_images/uuidValidator.middleware";
import { updateUserProfileController } from "../controllers/user/user_profile/update_user_profile.controller";
import { deleteLookingForController } from "../controllers/user/user_profile/looking_for/deleteLookingFor.controller";
import { UpdateUserAddDataController } from "../controllers/user/user_aditional_data/UpdateUserAddData.controller";
import { deleteUserAddDataController } from "../controllers/user/user_aditional_data/deleteUserAddData.controller";
import deleteRelationShipController from "../controllers/user/user_profile/type_of_relationship/deleteRelationshipController";
import updateTypeOfRelationShip from "../controllers/user/user_profile/type_of_relationship/updateTypeOfRelationShip";
import userDeleteProfileController from "../controllers/user/user_profile/delete_user_profile.controller";
import { activateUserMiddleware } from "../middlewares/activateUser.middleware";
import activateUserAdminController from "../controllers/user/activateUserAdmin.controller";
import { verifyUuidParamsMiddleware } from "../middlewares/verifyUuidParams.middleware";
import devCreateUserController from "../controllers/user/devCreate.controller";
import updateUserHobbiesController from "../controllers/user/user_aditional_data/user_hobbies/update_user_hobbies.controller";
import deleteUserHobbieController from "../controllers/user/user_aditional_data/user_hobbies/delete_user_hobbie.controller";
import { deleteUserPetsController } from "../controllers/user/user_aditional_data/user_pets/deleteUserPets.controller";
import { updateUserPetsController } from "../controllers/user/user_aditional_data/user_pets/updateUserPets.controller";
import { uuidBodyMiddleware } from "../middlewares/verifyUuid.middleware";

const usersRoutes = Router();

usersRoutes.get(
  "/all",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listUsersController
);

usersRoutes.get(
  "/data/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  userListController
);

usersRoutes.delete(
  "/data/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  userDeleteController
);

usersRoutes.patch(
  "/data/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  editUserMiddleWare,
  userEditController
);

usersRoutes.post("", createUserController);

usersRoutes.patch(
  "/email/:tokenEmail",
  activateUserMiddleware,
  activateUserController
);

usersRoutes.patch(
  "/address/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  updateUserAddressController
);

usersRoutes.patch(
  "/profile/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  updateUserProfileController
);

usersRoutes.patch(
  "/lookingfor/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  updateLookingForController
);

usersRoutes.patch(
  "/relationship/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  updateTypeOfRelationShip
);

usersRoutes.patch(
  "/images/:id?",
  imageHeadersMiddleware,
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  upload.array("image", Infinity),
  imageEditController
);

usersRoutes.patch(
  "/additional/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  UpdateUserAddDataController
);

usersRoutes.patch(
  "/hobbies/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  uuidBodyMiddleware,
  updateUserHobbiesController
);

usersRoutes.patch(
  "/pets/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  uuidBodyMiddleware,
  updateUserPetsController
);

usersRoutes.patch("/languages/:id");

usersRoutes.patch("/music/:id");

usersRoutes.delete(
  "/address/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  userDeleteAddressController
);

usersRoutes.delete(
  "/profile/:id",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  userDeleteProfileController
);

usersRoutes.delete(
  "/lookingfor/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  deleteLookingForController
);

usersRoutes.delete(
  "/relationship/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  deleteRelationShipController
);

usersRoutes.delete(
  "/images/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  uuidMiddleware,
  imageDeleteController
);

usersRoutes.delete(
  "/additional/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  deleteUserAddDataController
);

usersRoutes.delete(
  "/hobbies/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  uuidBodyMiddleware,
  deleteUserHobbieController
);

usersRoutes.delete(
  "/pets/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  uuidBodyMiddleware,
  deleteUserPetsController
);

usersRoutes.delete("/languages/:id");

usersRoutes.delete("/music/:id");

usersRoutes.patch(
  "/activate/:id",
  verifyUuidParamsMiddleware,
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyAdminMiddleware,
  activateUserAdminController
);

usersRoutes.post("/devcreate/", devCreateUserController);

export default usersRoutes;
