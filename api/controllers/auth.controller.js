import path from 'path';
import bcrypt from 'bcryptjs';
import User from '../model/Users.model.js';
import { getUploadsDir } from '../../uploads/getUploadsDir.js';
export const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  const file = req.file;
  // console.log(path.normalize(file.filename)); //filename
  // console.log(path.normalize(file.destination)); //dir name
  // console.log(path.normalize(file.path)); //full name

  // ## if one of these fields are missing, response bad request
  if (!username || !email || !password) return res.sendStatus(400);

  // ## if email already exist, response bad request
  const emailExist = await User.findOne({ email: email });
  if (emailExist)
    return res.status(400).json({ message: 'email already exist' });

  // ## if email is new, create new user

  // encrypt the given password
  const hashedPwd = await bcrypt.hash(password, 10);
  const photoUrl = file
    ? path.normalize(file.path)
    : path.join(getUploadsDir(), 'default.jpeg');
  await User.create({
    username,
    email,
    password: hashedPwd,
    photoUrl,
  });
  res.status(201).json({ message: 'created' });
};
