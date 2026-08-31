import {Router} from 'express';
import * as userController from "../controller/user.controller";
import * as userValidate from "../validations/user.validate";

const router = Router();
router.post("/register", userValidate.registerPost, userController.RegisterPost);
export default router;
