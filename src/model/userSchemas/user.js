import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minlength:5
    },
    password: {
        type: String,
        require: true,
        minlength: 5
    },
    admin : {
        type: Boolean,
        default: false
    }
},{timestamps: true}
);

const User = model('user', userSchema);

export default User;