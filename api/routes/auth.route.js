import express from 'express';
import {
  signinController,
  signoutController,
  signupController,
} from '../controllers/auth.controller.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'api/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', upload.single('file'), signupController);
router.post('/signin', signinController);
router.post('/signout', signoutController);
export default router;
