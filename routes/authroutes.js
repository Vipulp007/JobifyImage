import express from 'express';
import { register, login, updateUser } from '../assets/auth.js';
import path from 'path';
import authenticate from '../middleware/authenticate.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, process.env.DIR_NAME);
// Define the route for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const fileFilter = function (req, file, cb) {
  // Check if the file format is allowed
  const allowedFormats = ['image/jpeg', 'image/png'];
  if (allowedFormats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Please Provide JPG or PNG format'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.route('/register').post(register);
router.route('/login').post(login);
router
  .route('/updateuser')
  .patch(authenticate, upload.single('image'), updateUser);
export default router;
