import ErrorHandler from "../Middleware/error.js";
import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import { User } from "../Models/userModel.js";

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    function validatePhoneNumber(phone) {
      const PhoneRegex = /^\+91\d{10}$/;
      return PhoneRegex.text(phone);
    }

    if (!validatePhoneNumber(phone)) {
      return next(new ErrorHandler("Invalid phone number.", 400));
    }

    const existingUser = await User.findOne({
      $or: [
        {
          email,
          accountVerified: true,
        },
        {
          phone,
          accountVerified: true,
        },
      ],
    });

    if (existingUser) {
      return next(new ErrorHandler("Phone or Email is already used.", 400));
    }

    const registrationAttempsByUser = await User.find({
      $or: [
        {
          email,
          accountVerified: false,
        },
        {
          phone,
          accountVerified: false,
        },
      ],
    });

    if (registrationAttempsByUser.length > 3) {
      return next(
        new ErrorHandler(
          "You have the exceeded the maximum number fo attemps (3). Please try again afer an hour",
          400
        )
      );
    }

    const userData = {
      name,
      email,
      phone,
      password,
    };

    const newUser = await User.create(userData);
    const verificationCode = await User.generateVerificationCode();
    await newUser.save();
    sendVerificationCode(verificationMethod, verificationCode, email, phone);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
});
