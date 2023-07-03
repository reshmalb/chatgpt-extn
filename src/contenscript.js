// (()=>{
//      let currentvideo = " ";
//      let youtubeLeftControls, youtubePlayer;
//      chrome.runtime.onMessage.addListener((obj,sender,response)=>{
//         const {type,value,videoId} = obj;
//         if(type === 'NEW'){
//             currentvideo=videoId;
//         }
//      })


// })();
import React, { useEffect, useState } from 'react';



const MyComponent = () => {
    const [currentVideo, setCurrentVideo] = useState('');
    const [youtubeLeftControls, setYoutubeLeftControls] = useState(null);
    const [youtubePlayer, setYoutubePlayer] = useState(null);
  
    useEffect(() => {
      // Add event listener
      chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;
        if (type === 'NEW') {
          setCurrentVideo(videoId);
          newvideoLoaded();
        }
      });
  
      // Clean up the event listener
      return () => {
        chrome.runtime.onMessage.removeListener(handleMessage);
      };
    }, []);
  
    // Rest of the component code...
    const newvideoLoaded=()=>{
        youtubeLeftControls =document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer =document.getElementsByClassName("video-stream")[0];
        youtubeLeftControls.appendChild("btn")

    }
  };
  export default MyComponent;
