import MessageSchema from "../schema/MessageSchema.js";
import mongoose from 'mongoose';

const Message = mongoose.model("message",MessageSchema);
export default Message;