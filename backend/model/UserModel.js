import mongoose from "mongoose"
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength : [6, "Password must be atleast 6 characters"],
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },

});

const User = mongoose.model("User", UserSchema)

export default User;