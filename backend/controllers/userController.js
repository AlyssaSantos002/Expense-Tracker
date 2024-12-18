import User from '../model/UserModel.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //Check if all fields are entered
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }

        //Check if the user already exits
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        let newUser = await User.create({
            name, email, password: hasedPassword,
        });

        return res.status(200).json({
            success: true,
            message: "User created succcessfully",
            user: newUser
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Check if all fields are entered
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }

        //Check if the user already exits
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        //Check if fields match 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }


        delete user.password;

        return res.status(200).json({
            success: true,
            message: `Welcome , ${user.name}`,
            user,
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

export const profileUser = async (req, res) => {
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
};


export const signoutUser = (req, res) => {
    try {
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ message: 'An error occurred during logout', error: err });
    }
};
