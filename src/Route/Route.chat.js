import express from "express"
import {messageController,  allmessages } from "../Controllers/Controllers.chat.js";
import authMiddleware from "../Middleware/Middleware.js";


const router=express.Router()
router.post("/message", authMiddleware,messageController)
router.get("/allmessages", authMiddleware,allmessages)
export default router;
