import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import validator from 'validator'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await JWT.sign({ _id: user._id }, "moiz@321", {
    expiresIn: "7D",
  });
  return token;
};

const modelUser = mongoose.model("User", userSchema);

export { modelUser };
