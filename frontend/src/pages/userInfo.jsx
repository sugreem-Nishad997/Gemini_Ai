import React, { useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { ChatContext } from '../context/ChatProvider';
import { Button, skeletonClasses } from '@mui/material';
import '../styles/userInfo.css';
export default function userInfo() {

    
    const { selectedUser, lastLogedIn, setLastLogedIn, setSelectedUser, handleLogout } = useContext(ChatContext);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setLastLogedIn(foundUser);
          setSelectedUser(foundUser);
        }
      }, []);
    
    function stringToColor(string) { 
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }
    let isLogin = false;
    
    if(selectedUser !== undefined && lastLogedIn !== undefined){
        if(selectedUser._id === lastLogedIn._id){
            isLogin = true;
        }
    }
    let name = "";
    if (selectedUser) {
        name = Array.from(selectedUser.username)[0] + Array.from(selectedUser.username)[selectedUser.username.length - 1];
    }
    return (
        <div className='userInfo-container'>
            <div className='userInfo-user'>
                <Avatar sx={{ bgcolor: stringToColor(name) }}>{name}</Avatar>
                <h3>{selectedUser?selectedUser.username:""}</h3>
                <p>{selectedUser?selectedUser.email:""}</p>
            </div>
            <Button color={isLogin?'error':'primary'} variant='outlined' onClick={()=>handleLogout()}>{isLogin?"Logout":"login"}</Button>
        </div>

    )
}