import React from 'react';
import Header from './mainComponent/header';
import ChatSection from './mainComponent/chatSection';
import InputSection from './mainComponent/inputSection';
export default function main(){
    return(
        <div className='main'>
            <Header></Header>
            <ChatSection></ChatSection>
            <InputSection></InputSection>
        </div>
    )
}