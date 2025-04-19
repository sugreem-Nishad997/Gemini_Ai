import {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Your email address is required"],
            unique: true,
        },
        username: {
            type: String,
            required: [true, "Your username is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Your password is required"],
        }
          
    }
);
UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
export default UserSchema;