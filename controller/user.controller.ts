import { Request, Response } from "express";
import AccountUser from "../models/account-user.model";
import bcrypt from "bcryptjs";

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
   