import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid'
import usericon from "../asset/DefaultProfile .jpg"
import icon from "../asset/ai-icon.png";

import {
	MainContainer,
	ChatContainer,
	MessageList,
	MessageInput,
	TypingIndicator,
	Message,
	Avatar,
	ConversationHeader,
	Button,
	
} from "@chatscope/chat-ui-kit-react";
import { processChatApi} from '../redux/action/DataActions'
import {MessageAction, isChatLoading,isFetchError} from '../redux/slice/ChatMessagesSlice'

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useDispatch,useSelector } from "react-redux";

const ChatArea = () => {

   const storeMessages=useSelector(state=>state.chatmessages.chatlist);
   const isLoading = useSelector(state=>state.chatmessages.isLoading) 
   const isError =useSelector(state=>state.chatmessages.isError)
   const dispatch=useDispatch();
   const [messages,setChatMessages]=useState(storeMessages );
	
	useEffect(()=>{
		setChatMessages(storeMessages)
	},[storeMessages]);



	const handleSend = async (message) => {
		const newmessage = {
			id:uuidv4(),
			message: message,
			sender: "user",
            direction:"outgoing"
		};
	 setChatMessages([...storeMessages,newmessage])
	     const newMessages = [ newmessage];		  
		dispatch(processChatApi(newMessages))
	}
	const handleChatHistory=()=>{
		dispatch(MessageAction.clearChatHistory());
		setChatMessages(storeMessages)

	}

	return (
		<div
			className="chatarea"
			style={{
				position: "relative",
				height: "500px",
				maxWidth: "400px",
				borderEndEndRadius:"20 px",
				borderBottomRightRadius:"20px",
				
				
			}}>				
			<MainContainer>   
		      
				<ChatContainer >
				
					<MessageList
					scrollBehavior="smooth"
						typingIndicator={
							isLoading ? (
								<TypingIndicator content="ChatGPT is typing..." />
							) : null
						}>
				     <Button labelPosition="right" style={{border:"1px solid green",
				          fontSize:".5rem",position:"fixed",
						  justifyContent:"right",
						  marginBottom:"2px",
						  marginTop:'10px',
						  marginLeft: "325px",
						  color:"green"}}
						   onClick={handleChatHistory}>Clear Chat</Button>    
          

						{messages.map((message) => {
							return(
							 <Message key={message.id} 
							model={message} style={{color:"green"}} >		
						{message.sender === "ChatGPT" ? (<Avatar src={icon} size="sm"
				      style={{width:"10px",height:"10px",borderRadius:"50%"}} name="ChatGPT" />):null}
						</Message>)
							
						})}

						{isError && (<div
						 style={{borderColor:"crimson",
						  background: "rgba(247,247,248,var(--tw-bg-opacity))"}}>
							<p style={{color:"darkred"}}> An error occurred.
							 Either the engine you requested does not exist or
							  there was another issue processing your request.
							   If this issue persists please contact
							    us through our help center at help.openai.com.</p></div>)}
					</MessageList>
					<MessageInput placeholder="Type  message here" onSend={handleSend} />
				</ChatContainer>
			</MainContainer>
		</div>
	);
};

export default ChatArea;
