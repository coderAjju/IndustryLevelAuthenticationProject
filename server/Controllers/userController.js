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
async function sendVerificationCode(
  verificationMethod,
  verificationCode,
  email,
  phone
) {
  if (verificationMethod === "email") {
    const message = generateEmailTemplate(verificationCode);
    sendMail({ email, subject: "Your verification code", message });
  }
}

function generateEmailTemplate(verificationCode) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    .header {
      text-align: center;
      background-color: #4caf50;
      padding: 20px;
      color: #ffffff;
      border-radius: 10px 10px 0 0;
    }
    .content {
      text-align: center;
      padding: 20px;
      font-size: 16px;
      color: #333333;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #4caf50;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #777777;
      padding: 10px;
      border-top: 1px solid #eaeaea;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Verify Your Account</h1>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Your One-Time Password (OTP) for verification is:</p>
      <div class="otp">${verificationCode}</div>
      <p>Please use this OTP to complete your verification process.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      <p>Thank you for using our service!</p>
      <p>Contact us at upadhyayajay437@gmail.com if you have any questions.</p>
    </div>
  </div>
</body>
</html>

  `;
}
