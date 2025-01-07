import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const  HASHING_PASSWORD = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    const hashingPassword = await bcrypt.genSalt(HASHING_PASSWORD);
    this.password = await bcrypt.hash(this.password, hashingPassword);
    next();
});



const User = mongoose.model('User', UserSchema);
export default User;