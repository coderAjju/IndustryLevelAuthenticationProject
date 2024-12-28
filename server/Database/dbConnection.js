import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose connection successfully.");
  } catch (error) {
    console.log(error);
    console.log("Error occured during the connection with mongodb.");
  }
};
