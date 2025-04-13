import {Schema} from 'mongoose';
import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema(
    {
        sending:{
            type:String
        },
        receving:{
            type:String,
            required:true,
        },
        createdAt: {
            type: Date,
            default: new Date(),
        },
        author:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    }
);
  
export default MessageSchema;