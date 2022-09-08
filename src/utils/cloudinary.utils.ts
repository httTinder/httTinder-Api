import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const CLOUDINARY_URL = cloudinary.config({
  cloud_name: "dtgkjo5sy",
  api_key: "233472814953427",
  api_secret: "bGtUEh03unKMhW3sb78rGaEJHxU",
});

export const upload = multer({
  storage: multer.diskStorage({
    destination: "upload",
    filename: (request, file, callback) => {
      const filename = `${file.originalname}`;

      return callback(null, filename);
    },
  }),
});