

import mongoose , { Schema } from "mongoose";

const userSchema = new Schema(
    {
        user_name: String,
        password: String,
        name: String,
        email: String,
        phone: Number,
        role: { type: String, default: 'user' },
        city: { type: Schema.Types.ObjectId, ref: 'City'}
    }
)
const User = mongoose.model('User',userSchema)
export default User;
