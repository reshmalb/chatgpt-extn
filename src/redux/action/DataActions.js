import { MessageAction } from "../slice/ChatMessagesSlice";
import { v4 as uuidv4 } from "uuid";
const API_KEY = "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";

export const processChatApi = (chatmessage) => {
	return async (dispatch) => {
		const chatList = async () => {
			dispatch(MessageAction.isChatLoading());
			const apiMessage = chatmessage.map((messageObject) => {
				const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
				return { role: role, content: messageObject.message };
			});

			const apiRequestBody = {
				model: "gpt-3.5-turbo",
				messages: [...apiMessage],
			};

			const response = await fetch(
				"https://api.openai.com/v1/chat/completions",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${API_KEY}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(apiRequestBody),
				}
			);
			if (!response.statusText === "OK") {
				throw new Error("error");
			} else {
				return response.json();
			}
		};
		try {
			const responseData = await chatList();
			const newChatMessage = {
				id: uuidv4(),
				message: responseData.choices[0].message.content,
				sender: "ChatGPT",
			};
			dispatch(MessageAction.addchatList([...chatmessage, newChatMessage]));
			// dispatch(MessageAction.addchatList(newChatMessage))
		} catch (error) {
      dispatch(MessageAction.isFetchError())

			console.log(error.message);
		}
	};
};
