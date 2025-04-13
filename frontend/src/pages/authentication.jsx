import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import httpStatus from 'http-status';
import { useNavigate } from "react-router-dom";
import { Button, Box, Snackbar } from '@mui/material';
import { ChatContext } from '../context/ChatProvider';
export default function authentication () {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const [formState, setFormState] = useState(0);
    const [open, setOpen] = useState(false);
    
    const {setSelectedUser,setLastLogedIn} = useContext(ChatContext);

    const client = axios.create({
        baseURL: "https://gemini-ai-three-orpin.vercel.app/"
    });

    const router = useNavigate();
    const handleRegister = async (email, username, password) => {
        try {
            let request = await client.post("/register", {
                email: email,
                username: username,
                password: password
            })
            if (request.status === httpStatus.CREATED) {
                return request.data.message
            }else{
                return request.data.message;
            }
        } catch (e) {
            throw e;
        }
    }

    const handleLogin = async(username, password) => {
        try{
            let user = await client.post("/login", {
                username:username,
                password:password
            })
            if(user.status === httpStatus.OK){
                setSelectedUser(user.data.user)
                setLastLogedIn(user.data.user)
                localStorage.setItem('user',JSON.stringify(user.data.user));
                router("/chats");
            }
        }catch(err){
            throw err;
        }
    }


    const handleAuth = async () => {
        try {
            //console.log();
            if (formState === 0) {
                await handleLogin(username, password);
                setError("");
            }

            if (formState === 1) {
                let result = await handleRegister(email, username, password);
                console.log(result);
                setMessage(result);
                setUsername("");
                setOpen(true);
                setFormState(0);
                setPassword("");
                setError('');
            }
        } catch (err) {
            let message = err.response.data.message;
            setError(message);
            console.log(err);
        }
    }
    return (
        <>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <div>
                    <Button variant={formState === 0 ? "contained" : ""} onClick={() => { setFormState(0) }}>Sign In</Button>
                    <Button variant={formState === 1 ? "contained" : ""} onClick={() => { setFormState(1) }}>Sign Up</Button>
                </div>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    {formState === 1 ?
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="email"
                            name="email"
                            value={email}
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        /> : <></>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <p style={{ color: "red" }}>{error}</p>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleAuth}
                    >
                        {formState === 0 ? "LogIn" : "Register"}
                    </Button>

                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />
        </>
    )
}