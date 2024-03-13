import express from 'express';
import { signupController } from '../controllers/auth.controller.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${file.fieldname}-${uniqueSuffix}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', upload.single('file'), signupController);
export default router;
