import {Router} from "express";
import { login, register, allUsers } from "../controllers/userControllers.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/allUsers").post(allUsers);

export default router;