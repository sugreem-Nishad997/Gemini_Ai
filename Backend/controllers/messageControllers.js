import Message from '../model/MessageModel.js';
import User from '../model/UserModel.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function textGenTextOnlyPrompt(mess) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = mess;

    const result = await model.generateContent(prompt);
    return result.response.text();
}


const showAllMessages = async (req, res) => {
    try {
        let id = req.body.id;
        let user = await User.findOne({ _id: id });
        if (user) {
            let allMessages = await Message.find({ author: user._id });
            return res.json(allMessages);
        }
    } catch (err) {
        console.log(err);
    }
}

const newMessage = async (req, res) => {
    try {
        let { msg, id } = req.body;
        let response = await textGenTextOnlyPrompt(msg);
        await Message.create({ sending: msg, receving: response, author: id });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
}
export { showAllMessages, newMessage };