import express from 'express';
import { registerUser, loginUser, profileUser, signoutUser } from '../controllers/userController.js'
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/profile", profileUser);
router.get("/signout", signoutUser);

export default router;