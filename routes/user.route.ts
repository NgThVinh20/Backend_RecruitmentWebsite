import {Router} from 'express';
import * as userController from "../controller/user.controller";
import * as userValidate from "../validations/user.validate";

const router = Router();
router.post("/register", userValidate.registerPost, userController.RegisterPost);
router.post("/login", userValidate.loginPost, userController.loginPost);
export default router;
