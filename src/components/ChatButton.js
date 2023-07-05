import React ,{useState}from "react";
import icon from "../asset/ai-icon.png";



const ChatButton = ({onClick,buttonStatus}) => {
	
	  const tootltip = buttonStatus ?   'Deactivate' :'Activate';  
	

	return (
		<>
			<button onClick={onClick}
          style={{border:"none",
              width:"400px",
              backgroundColor:"lightblue",
			  alignContent:"space-between",
              textAlign:"start",
              fontFamily:"cursive",
              fontSize:"20px"}}>
				<img
          className="logo"
					src={icon}
					alt=""
					style={{ width: "40px", height: "40px", borderRadius: "50%" }}></img>
			  ChatGPT	{buttonStatus === true? 
							  (<span style={{color:"red",fontFamily:"cursive",
							  fontSize:"small",			                  
						  fontWeight:"normal",
						  marginLeft:"190px"}}>{tootltip}</span>)
							  :  (<span style={{color:"green",fontFamily:"cursive",
							  fontSize:"small",			                  
						  fontWeight:"normal",
						  marginLeft:"190px"}}>{tootltip}</span>)}
			</button>

		</>
	);
};

export default ChatButton;
