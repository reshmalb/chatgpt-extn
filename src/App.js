import React, { useState } from 'react';
import ChatArea from './components/ChatArea';
import ChatButton from './components/ChatButton';


const App = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleChatButton = () => {
    setIsClicked(!isClicked);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Get the maximum position values based on the screen dimensions
    const maxWidth = window.innerWidth - 200; // Adjust as needed
    const maxHeight = window.innerHeight - 200; // Adjust as needed

    // Calculate the new position within the screen bounds
    let newX = position.x + e.movementX;
    let newY = position.y + e.movementY;
    newX = Math.max(0, Math.min(newX, maxWidth));
    newY = Math.max(0, Math.min(newY, maxHeight));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <ChatButton onClick={handleChatButton} buttonStatus={isClicked} />
      {isClicked && <ChatArea />}
    </div>
  );
};

export default App;
