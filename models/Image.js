import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UnAuthenticate from '../errors/unauthenticate.js';
const ImageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide user'],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Image', ImageSchema);
