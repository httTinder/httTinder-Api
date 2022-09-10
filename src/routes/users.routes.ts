import { verifySchemasMiddleware } from "./../middlewares/verifySchemas.middleware";
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
import { userAddDataSchema } from "../schemas/userAddData/userAddData.schemas";
import { userEditSchema, userSchema } from "../schemas/user/user.schemas";
import { updateUserProfileSchema } from "../schemas/userProfile/updateUserProfile.schemas";
import { lookingForSchema } from "../schemas/userProfile/lookingfor/updateLookingfor.schemas";
import { relationshipSchema } from "../schemas/userProfile/lookingfor/relationship/updateRelationship.schemas";
import { addressRequestSchema } from "../schemas/user/address/address.schemas";
import { updateUserMusicController } from "../controllers/user/user_aditional_data/user_music_genre/updateUserMusic.controller";
import { deleteUserMusicController } from "../controllers/user/user_aditional_data/user_music_genre/deleteUserMusic.controller";
import { updateUserLanguageController } from "../controllers/user/user_aditional_data/user_languages/updateUserLanguage.controller";
import { uuidBodyMiddleware } from "../middlewares/verifyUuid.middleware";
import { deleteUserLanguageController } from "../controllers/user/user_aditional_data/user_languages/deleteUserLanguage.controller";
import { deleteUserPetsController } from "../controllers/user/user_aditional_data/user_pets/deleteUserPets.controller";
import { updateUserPetsController } from "../controllers/user/user_aditional_data/user_pets/updateUserPets.controller";
import { hobbiesSchema } from "../schemas/userAddData/hobbies/hobbies.schema";
import { languageSchema } from "../schemas/userAddData/language/language.schemas";
import { musicSchema } from "../schemas/userAddData/music/music.schemas";
import { petsSchema } from "../schemas/userAddData/pets/pets.schemas";

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
  verifyIdMiddleware,
  verifyActiveMiddleware,
  verifySchemasMiddleware(userEditSchema),
  editUserMiddleWare,
  userEditController
);

usersRoutes.post("", verifySchemasMiddleware(userSchema), createUserController);

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
  verifySchemasMiddleware(lookingForSchema),
  updateLookingForController
);

usersRoutes.patch(
  "/relationship/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  verifySchemasMiddleware(relationshipSchema),
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
  verifySchemasMiddleware(userAddDataSchema),
  UpdateUserAddDataController
);

usersRoutes.patch(
  "/hobbies/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  verifySchemasMiddleware(hobbiesSchema),
  uuidBodyMiddleware,
  updateUserHobbiesController
);

usersRoutes.patch(
  "/pets/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  verifySchemasMiddleware(petsSchema),
  uuidBodyMiddleware,
  updateUserPetsController
);

usersRoutes.patch(
  "/languages/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  verifySchemasMiddleware(languageSchema),
  uuidBodyMiddleware,
  updateUserLanguageController
);

usersRoutes.patch(
  "/music/:id?",
  uuidBodyMiddleware,
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  verifySchemasMiddleware(musicSchema),
  updateUserMusicController
);

usersRoutes.delete(
  "/address/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  verifySchemasMiddleware(addressRequestSchema),
  userDeleteAddressController
);

usersRoutes.delete(
  "/profile/:id",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  verifySchemasMiddleware(updateUserProfileSchema),
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

usersRoutes.delete(
  "/languages/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  uuidBodyMiddleware,
  deleteUserLanguageController
);

usersRoutes.delete(
  "/music/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyIdMiddleware,
  uuidBodyMiddleware,
  deleteUserMusicController
);

usersRoutes.patch(
  "/activate/:id",
  verifyUuidParamsMiddleware,
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  verifyAdminMiddleware,
  activateUserAdminController
);

usersRoutes.post("/devcreate/", verifySchemasMiddleware(userSchema), devCreateUserController);

export default usersRoutes;
