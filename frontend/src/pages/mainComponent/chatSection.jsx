import React, { useContext } from 'react';
//import {Comment} from 'react-loader-spinner';
import { ChatContext } from '../../context/ChatProvider.jsx';
import './chatSection.css';

export default function chatSection() {
    const { allMessages, endRef} = useContext(ChatContext);

    return (

        <div className='chatSection-container'>
            {allMessages !== undefined ?
                allMessages.map((messag, idx) => (
                    <div key={idx}>
                        <div className='send' key={messag._id}>{messag.sending}</div>
                        <div className='receive' key={idx}>{messag.receving}</div>
                    </div>
                )) : ""
            }
            <div ref={endRef}></div>
        </div>

    )
}