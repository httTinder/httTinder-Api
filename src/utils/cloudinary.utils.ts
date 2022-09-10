import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import 'dotenv/config'

const CLOUDINARY_URL = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
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