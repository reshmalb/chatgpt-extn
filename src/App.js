import React, { useState } from 'react';
import ChatArea from './components/ChatArea';
import ChatButton from './components/ChatButton';
import './App.css'


const App = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleChatButton = () => {
    setIsClicked(!isClicked);
  };



  return (
    <div
      className="App"
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        zIndex: '999',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
   
    >
      <ChatButton onClick={handleChatButton} buttonStatus={isClicked} />
      {isClicked && <ChatArea />}
    </div>
  );
};

export default App;
