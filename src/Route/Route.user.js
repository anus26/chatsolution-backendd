import express from "express"
import authMiddleware from "../Middleware/Middleware.js"
import { singup ,login, logout, allUser} from "../Controllers/Controllers.user.js"


const router=express.Router()
router.post("/singup",singup)
router.post("/login",login)
router.post("/logout", logout)
router.get("/alluser", authMiddleware,allUser)
export default router;