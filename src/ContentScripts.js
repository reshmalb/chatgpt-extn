import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Import your React component here
import ChatButton from './components/ChatButton';

// Create a new DOM element to mount the React component
const buttonContainer = document.createElement('div');

// Append the DOM element to the desired location on the YouTube page
const targetElement = document.getElementsByClassName('ytb-left-controls');
targetElement.appendChild(buttonContainer);

// Render your React component inside the DOM element
ReactDOM.render(<App />, buttonContainer);