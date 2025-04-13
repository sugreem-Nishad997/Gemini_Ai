import UserSchema from "../schema/UserSchema.js";
import mongoose from "mongoose";

const User = mongoose.model("User",UserSchema);
export default User;