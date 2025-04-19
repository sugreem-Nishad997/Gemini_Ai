import React, {useState, createContext, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
//import dotenv from 'dotenv';
import axios from 'axios';

export const ChatContext = createContext();
//dotenv.config();

export const ChatProvider = ({children}) => {

    //const server = process.env.server;

    const router = useNavigate();

    const endRef = useRef(null);
    
    const [selectedUser, setSelectedUser] = useState();
    const [allMessages, setAllMessages] = useState([]);
    const [users, setUsers] = useState();
    const [lastLogedIn, setLastLogedIn] = useState();
    const[filteredUser, setFilteredUsers] = useState([]);
    //const [loader, setLoader] = useState(true);

    const client = axios.create({
        baseURL: "https://gemini-ai-backend-pf3n.onrender.com"
    });

    const findAllUsers = async () => {

        try {
            let allUsers = await client.post("/allUsers");
            if (allUsers) {
                setUsers(allUsers.data);
                setFilteredUsers(allUsers.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogout = () => {
        localStorage.setItem('user',"");
        setLastLogedIn("");
        setSelectedUser("");
        router("/");
    }
    const getAllMessages = async (id) => {
        try {
            let allMessages = await client.post("/showAllMessages", {
                id: id
            })
            if (allMessages) {
                setAllMessages(allMessages.data);                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const responseMsg = async (input,userId) => {
        try {

            const data = await client.post("/newMessage",{
                msg:input,
                id:userId
            });
            let res = {sending:input, receving:data.data, author:userId}
            setAllMessages((prev)=>{
                return[...prev, res]
            })

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        findAllUsers();
        if(selectedUser){
            getAllMessages(selectedUser._id)
        }
        endRef.current?.scrollIntoView({behavior : "smooth"});
    }, [selectedUser]);
    

    const data = {selectedUser, setSelectedUser, allMessages, setAllMessages, users, setUsers, getAllMessages, responseMsg, lastLogedIn, setLastLogedIn, endRef, handleLogout, filteredUser, setFilteredUsers};
    return(
        <ChatContext.Provider value={data}>
            {children}
        </ChatContext.Provider>
    )
}