import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


const LOCAL_KEY=uuidv4();


const persistedChatList = localStorage.getItem('My-Chat');
const INITIAL_STATE = {
  chatlist: persistedChatList ? JSON.parse(persistedChatList) : [{ 
	id: uuidv4(),
	 message: "Hello, Ask me anything...",
	 sender: "ChatGPT" }],
     isLoading: false,
     isError: false,
	 isActivated:false,
};

// const INITIAL_STATE={
// 	chatlist: [{ 
// 		id: uuidv4(),
// 		 message: "Hello, Ask me anything...",
// 		 sender: "ChatGPT" }],
// 	isLoading: false,
// 	isError: false,
// };
const ChatMessageSlice = createSlice({
	name: "messages",
	initialState: INITIAL_STATE,
	reducers:{
		addchatList(state,action){		
				state.isError=false;
				state.isLoading=false;	
				const newItem = action.payload;
				state.chatlist= [...state.chatlist,...newItem]				
				localStorage.setItem('My-Chat', JSON.stringify(state.chatlist));
		},
		isChatLoading(state){
			state.isLoading=true;
			state.isError=false;
		},
		isFetchError(state){
			state.isLoading=false;
			state.isError=true;
		},
		activateChatButton(state,action){
			state.isActivated = ! state.isActivated;
			}

	}
	
});
export const MessageAction = ChatMessageSlice.actions;
export default ChatMessageSlice.reducer;
