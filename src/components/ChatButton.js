import React from "react";
import icon from "../asset/ai-icon.png";

const ChatButton = ({ buttonStatus, onClick }) => {
	const tootltip = buttonStatus ? "Deactivate ChatGPT" : "Acivate ChatGPT";

	return (
		<>
			<button onClick={onClick}
          style={{border:"none",
              width:"400px",
              backgroundColor:"lightblue",alignContent:"space-between",
              textAlign:"start",
              fontFamily:"cursive",
              fontSize:"20px"}}>
				<img
          className="logo"
					src={icon}
					alt=""
					style={{ width: "40px", height: "40px", borderRadius: "50%" }}></img>
				{tootltip}
			</button>
		</>
	);
};

export default ChatButton;
