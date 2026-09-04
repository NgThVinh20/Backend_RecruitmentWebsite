import { Request, Response } from "express";
import AccountUser from "../models/account-user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterPost = async (req: Request, res: Response) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;

  const existAccount = await AccountUser.findOne({
    email: email
  });

  if(existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newAccount = new AccountUser({
    fullName: fullName,
    email: email,
    password: hash
  });

  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công!",
  });
}
export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exitsAccount = await AccountUser.findOne({
    email: email,
  });

  if (!exitsAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, `${exitsAccount.password}`);
  if (!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng",
    });
    return;
  }


  const token = jwt.sign(
    {
      id: exitsAccount.id,
      email: exitsAccount.email,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax", // cho phép lấy cookie từ tên miền khác
    secure: process.env.NODE_ENV ==="production",
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!",
  });
};