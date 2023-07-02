import React, { useState } from "react";
import {
	MainContainer,
	ChatContainer,
	MessageList,
	MessageInput,
	TypingIndicator,
	Message,
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
const API_KEY = "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";

const ChatArea = () => {
	const [messages, setChatMessages] = useState([
		{
			message: "Hello, Ask me anything...",
			sender: "ChatGPT",
		},
	]);

	const [isTyping, setTyping] = useState(false);

	const handleSend = async (message) => {
		const newmessage = {
			message: message,
			sender: "user",
            direction:"outgoing"
		};

		const newMessages = [...messages, newmessage]; //old messages+ new chat messages
		//update messages

		setChatMessages(newMessages);

		//typing indicator
		setTyping(true);

		// manage messages with chatgpt
		await messageToChatGpt(newMessages);
	};

	async function messageToChatGpt(chatmessage) {
		let apiMessage = chatmessage.map((messageObject) => {
			let role = "";

			if (messageObject.sender === "ChatGPT") {
				role = "assistant";
			} else {
				role = "user";
			}
			return { role: role, content: messageObject.message };
		});

		const apiRequestBody = {
			model: "gpt-3.5-turbo",
			messages: [...apiMessage],
		};

		await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(apiRequestBody),
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				console.log(data);
				console.log(data ?.choices[0] ?.message ?.content);
				setChatMessages([
					...chatmessage,
					{
						message: data.choices[0].message.content,
						sender: "ChatGPT",
					},
				]);
				setTyping(false);
			});
	}

	return (
		<div
			className="chatarea"
			style={{
				position: "relative",
				height: "500px",
				width: "400px",
			}}>
			<MainContainer>
				<ChatContainer>
					<MessageList
                    scrollBehavior="smooth"
						typingIndicator={
							isTyping ? (
								<TypingIndicator content="ChatGPT is typing..." />
							) : null
						}>
						{messages.map((message, i) => {
							return <Message key={i} model={message} />;
						})}
					</MessageList>
					<MessageInput placeholder="Type  message here" onSend={handleSend} />
				</ChatContainer>
			</MainContainer>
		</div>
	);
};

export default ChatArea;
