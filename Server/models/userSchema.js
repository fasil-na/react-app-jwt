import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
    },
);

const User = mongoose.model("users", userSchema);
export default User;