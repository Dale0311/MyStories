import path from 'path';
import bcrypt from 'bcryptjs';
import User from '../model/Users.model.js';
import jwt from 'jsonwebtoken';
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
    : path.normalize(path.join('uploads', 'default.jpeg'));
  await User.create({
    username,
    email,
    password: hashedPwd,
    photoUrl,
  });
  res.status(201).json({ message: 'created' });
};

export const signinController = async (req, res) => {
  const { email, password } = req.body;
  // validate if email and password h`ave value
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // check if the email exist
  const userExist = await User.findOne({ email }).exec();
  if (!userExist) {
    return res.status(404).json({ message: "Email doesn't exist" });
  }

  // check if the input password is equal to the password of the queried email
  const match = await bcrypt.compare(password, userExist.password);
  if (!match) {
    return res.status(404).json({ meesage: 'email or password is incorrect' });
  }

  const { password: pwd, ...data } = userExist._doc;

  // if the user is pass the authentication
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN, {
    expiresIn: '3d',
  });

  //data = {
  //   _id: new ObjectId('65f1a7bcb5b91a05bded3fd0'),
  //   username: 'p',
  //   email: 'p',
  //   photoUrl: 'C:\\Users\\dannt\\Desktop\\MyStories\\uploads\\default.jpeg',
  //   createdAt: 2024-03-13T13:18:52.730Z,
  //   updatedAt: 2024-03-13T13:18:52.730Z,
  //   __v: 0
  // }
  res
    .cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'None',
      secure: true,
    })
    .json({ accessToken });
};
