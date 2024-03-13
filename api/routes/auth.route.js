import express from 'express';
import { signupController } from '../controllers/auth.controller.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { currentDir } from '../config/dirname.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(currentDir());
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', upload.single('file'), signupController);
export default router;
