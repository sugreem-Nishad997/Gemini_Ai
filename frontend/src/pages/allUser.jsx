import React, { useContext, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import '../styles/allUser.css';
import { Avatar, Box, IconButton, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from "../context/ChatProvider.jsx";
export default function allUsers() {

     const router = useNavigate();

    const { setSelectedUser, getAllMessages, users, selectedUser, filteredUser, setFilteredUsers } = useContext(ChatContext);
    const[open, setOpen] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const handleclick = (user) => {
        setSelectedUser(user);
        getAllMessages(user._id);
    }
    const handleChange = (e) => {
        setSearchItem(e);
        const filtered = users.filter((user) => {
           return e === '' ? users : user.username.toLowerCase().includes(searchItem.toLowerCase())
        });
        console.log(filtered)
        setFilteredUsers(filtered);
    }
    return (
        <div className='allUser-container'>
            <div className='allUser-header'>
                <h1>BlueChat</h1>
                <IconButton type='button' sx={{p:'10px'}} aria-label='search' onClick={()=>setOpen(!open)}>
                    <SearchOutlinedIcon/>
                </IconButton>
                <AddOutlinedIcon style={{cursor:"pointer"}} onClick={()=>router("/")}></AddOutlinedIcon>                
            </div>
            {open?<div>
                <InputBase  sx={{ ml: 1, flex: 1}}
                    placeholder="Search for User" value={searchItem} onChange={(e) => handleChange(e.target.value)}/>
                </div>:""}
            <div className='allUser-count'>
                <GroupOutlinedIcon></GroupOutlinedIcon>
                <h3>All</h3>
                <h3 className='count'>{users === undefined ? "" : users.length}</h3>
            </div>

            {filteredUser && selectedUser ? (
                <div className='user-container'>
                    {filteredUser.map((user, idx) => (
                        <div key={idx} className = {selectedUser._id === user._id ? "user1":"user"}style={{cursor:"pointer"}} onClick={() => handleclick(user)}>
                            <Avatar className='avatar'/>
                            <h3>{user.username}</h3>
                        </div>
                    ))
                    }
                </div>
            ) :
            ""}
        </div>
    )
}
