import path from 'path';
import bcrypt from 'bcryptjs';
import User from '../model/Users.model.js';
import jwt from 'jsonwebtoken';

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
  if (emailExist) {
    return res.status(400).json({ message: 'email already exist' });
  }

  // ## if email is new, create new user
  // encrypt the given password
  const hashedPwd = await bcrypt.hash(password, 10);
  const photoPath = file
    ? path.normalize(path.join('uploads', `${file.filename}`))
    : path.normalize(path.join('uploads', 'default.jpeg'));

  // replace all backslash(\) to forwardslash(/)
  const img = photoPath.replace(/\\/g, '/');
  const photoUrl = `http://localhost:5000/${img}`;
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
  bcrypt.compare(password, userExist.password, (err, success) => {
    if (!success) {
      return res
        .status(401)
        .json({ message: 'email or password is incorrect' });
    }

    // if match
    const { password: pwd, ...data } = userExist._doc;

    // if the user is pass the authentication
    // const userInfo = { ...data, photoUrl: photo };
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
    //   photoUrl: 'C:\Users\\dannt\Desktop\MyStories\uploads\default.jpeg',
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
  });
};

export const signoutController = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) return res.sendStatus(204);
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(200).json({ message: 'cookie cleared' });
};

export const getUser = async (req, res) => {
  const { email } = req.params;
  const { currentUser } = req;
  let isOwner = false;
  if (email === currentUser.email) {
    isOwner = true;
  }
  const user = await User.findOne({ email }).select('-password');
  res.json({ ...user._doc, isOwner });
};

export const setNewUsername = async (req, res, next) => {
  const { currentUser } = req;
  const { email } = req.params;
  const { username, newPassword, currentPassword } = req.body;

  // if email and passwords or username are empty then return error
  if (!email && (!newPassword || !username || !currentPassword))
    return res.status(400).json({ message: 'All fields are required' });

  // is the currentUser is the same person?
  if (currentUser.email !== email) return res.sendStatus(403);

  const foundUser = await User.findOne({ email });

  // if email doesn't exist
  if (!foundUser) return res.sendStatus(404);

  // if the req is for changing the password
  if (newPassword && currentPassword) {
    req.foundUser = foundUser;
    return next();
  }

  const data = await User.findOneAndUpdate(
    { email },
    { username },
    { new: true }
  ).select('-password');
  const accessToken = jwt.sign({ ...data._doc }, process.env.ACCESS_TOKEN, {
    expiresIn: '30m',
  });
  res.json({ accessToken });
};

export const setNewPassword = async (req, res) => {
  const { newPassword, currentPassword } = req.body;
  const { email } = req.params;
  const { foundUser } = req;
  const { jwt } = req.cookies;

  const matchPassword = await bcrypt.compare(
    currentPassword,
    foundUser.password
  );

  // if password did not match
  if (!matchPassword)
    return res.status(400).json({ message: 'current password is incorrect' });

  const hashPwd = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashPwd });

  if (!jwt) return res.sendStatus(204);
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.status(200).json({ message: 'Password updated successfully' });
};
