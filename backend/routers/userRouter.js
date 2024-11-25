import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js'
const router = express.Router();
import User from '../model/UserModel.js';

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post("/profile", async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email }).select("name email");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


export default router;