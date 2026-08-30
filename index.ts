import express, { Request, Response } from 'express';
const app = express()
import cors from "cors";
import * as userController from "./controller/user.controller";
const port = 5000

app.use(cors({
  origin:"http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
   allowedHeaders: ["content-Type", "Authorization"]
}));

app.use(express.json())

app.post("/user/register", userController.RegisterPost);

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`)
})