import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE}`);
    console.log("ket noi db thanh cong");
  } catch (error) {
    console.log("ket noi db that bai", error);
  }
};