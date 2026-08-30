import { Request, Response } from "express";
 export const RegisterPost = async (req : Request, res : Response)=> {
  console.log(req.body);
  res.json({
    code:"success",
    message:"Đăng kí tài khoản thành công"
  });
}