import React, { useState } from 'react';
import ChatButton from './components/ChatButton';
import ChatArea from './components/ChatArea';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { MessageAction } from './redux/slice/ChatMessagesSlice';

const App = () => {
  const activate=useSelector((state)=>state.chatmessages.isActivated);
	const [isClicked, setIsClicked] = useState(activate);
  const dispatch=useDispatch();
   
	const handleChatButton = () => {
	  dispatch(MessageAction.activateChatButton())    
    setIsClicked(activate);

 
	};
 

  
  
  return (
    <div className="App"  >   
    <ChatButton onClick={handleChatButton} buttonStatus={isClicked} />
    {isClicked && <ChatArea />}    
    </div>
  );
};

export default App;
