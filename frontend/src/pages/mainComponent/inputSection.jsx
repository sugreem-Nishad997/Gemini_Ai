import * as React from 'react';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { ChatContext } from '../../context/ChatProvider.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function inputSection() {
  let [input, setInput] = React.useState("hello");
  const [open, setOpen] = React.useState(false);

  const { selectedUser, responseMsg, lastLogedIn } = useContext(ChatContext);
  let change = (event) => {
    setInput(event.target.value);
  }
  const handleclick = async (input, userId) => {
    if (lastLogedIn) {
      if (lastLogedIn._id === userId) {
        setInput("");
        await responseMsg(input, userId);
      }else {
        console.log("open")
        setOpen(true)
      }
    } 
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Paper
        component="form"
        sx={{ display: 'flex', alignItems: 'center', width: '50vw' }}
        variant='outlined'
        onSubmit={(e) =>e.preventDefault()}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          id='message'
          value={input}
          onChange={change}
          autoComplete='off'
        />
        <IconButton type="button" sx={{ p: '10px' }} onClick={() => handleclick(input, selectedUser._id)}>
          <SendOutlinedIcon/>
        </IconButton>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          You must have to LogedIn to chat with Gemini!
        </Alert>
      </Snackbar>
    </>
  );
}
