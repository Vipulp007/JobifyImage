import User from '../models/User.js';
import Image from '../models/Image.js';
import BadRequest from '../errors/badrequest.js';
import UnAuthenticate from '../errors/unauthenticate.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new BadRequest('please provide all value');
    }
    const findemail = await User.findOne({ email });
    if (findemail) {
      throw new BadRequest('email already in use');
    }
    const user = await User.create(req.body);
    const location = user.location;
    user.save();
    const token = user.createJWT();
    res.status(201).send({ user, token, location });
  } catch (error) {
    console.log('error occur', error);
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequest('provide all details');
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnAuthenticate('no user exist');
    }
    const image = await Image.findOne({ createdBy: user._id });
    console.log(user, image);
    const location = user.location;
    const ispswd = await user.comparePswd(password);
    if (!ispswd) throw new UnAuthenticate('invalid password');
    const token = user.createJWT();
    res.status(200).send({ user, token, location, image: image?.image });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  const { email, name, lastName, location } = req.body;
  try {
    if (!email || !name || !lastName || !location) {
      throw new BadRequest('provide all details in form');
    }
    let imageUrl = null,
      image,
      userimage = null;
    if (req.file) {
      const data = {
        image: req.file.filename,
        createdBy: req.user.userId,
      };
      image = await Image.findOne({ createdBy: req.user.userId });
      console.log(image);
      if (!image) {
        image = await Image.create(data);
      } else {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = join(__dirname, process.env.DIR_NAME, image.image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('file deleted');
        } else {
          console.log('file not deleted');
        }
        image.image = req.file.filename;
        image.createdBy = req.user.userId;
        image.save();
      }
      imageUrl = req.file.filename;
      userimage = image.image;
    }
    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;
    const token = await user.createJWT();
    console.log(userimage);
    res.status(200).send({ user, token, imageUrl, image: userimage });
    await user.save();
  } catch (error) {
    next(error);
    console.log(error);
  }
};
export { register, login, updateUser };
