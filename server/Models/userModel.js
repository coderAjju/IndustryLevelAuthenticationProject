import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = await mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    minLength: [8, "Password must have atleast 8 characters."],
    maxLength: [32, "Password cannot have more than 32 characters."],
  },
  phone: String,
  accountVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: Number,
  verificationCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    let firstDigit = Math.floor(Math.random() * 9) + 1;
    let remainDigit = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);
    return parseInt(firstDigit + remainDigit);
  }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 5 * 60 * 1000;
  return verificationCode;
};

export const User = mongoose.model("User", userSchema);
