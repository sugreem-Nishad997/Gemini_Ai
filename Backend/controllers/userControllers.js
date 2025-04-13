import User from "../model/UserModel.js";
import bcrypt from 'bcrypt';

const login = async(req, res) => {
    let {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.json({message:"User not found"})
    }

    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(isPasswordCorrect){
        return res.json({message:"User loged in",user:user});
    }else{
        return res.status(401).json({message:"User or Password is Incorrect"})
    }
}

const register = async (req, res) => {
    let {email, username, password} = req.body;
    const existingUser = await User.findOne({username});
    if(existingUser){
        return res.json({message:"User already exist"});
    }
    const user = await User.create({email,username,password});
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
}

const allUsers = async(req, res) => {
    let allUsers = await User.find({});
    if(allUsers){
        return res.json(allUsers);
    }else{
        res.json({message:"not founded"});
    }
}

export {login, register, allUsers};