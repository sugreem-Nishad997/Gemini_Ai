import { Router } from "express";
import { showAllMessages, newMessage } from "../controllers/messageControllers.js";

const router = Router();

router.route("/newMessage").post(newMessage);
router.route("/showAllMessages").post(showAllMessages);

export default router;