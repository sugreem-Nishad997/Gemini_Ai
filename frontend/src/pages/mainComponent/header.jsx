import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatProvider';
import { Avatar } from '@mui/material';
import './header.css';
export default function header(){
    const{selectedUser} = useContext(ChatContext);
    let name = selectedUser ? selectedUser.username : "";
    let email = selectedUser ? selectedUser.email : "";
    return(
        <div className='header-container'>
            <Avatar/>
            <div>
                <h3>{name}</h3>
                <span>{email}</span>
            </div>
        </div>
    )
}