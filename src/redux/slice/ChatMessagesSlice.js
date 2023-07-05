import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


const LOCAL_KEY=uuidv4();


const persistedChatList = localStorage.getItem('My-Chat');
const activeStatus=localStorage.getItem('My-Status')
const activatedStatus= activeStatus ? JSON.parse(activeStatus):null;
const INITIAL_STATE = {
  chatlist: persistedChatList ? JSON.parse(persistedChatList) : [{ 
	id: uuidv4(),
	 message: "Hello, Ask me anything...",
	 sender: "ChatGPT" }],
     isLoading: false,
     isError: false,
	 isActivated: activatedStatus === null ? false: activatedStatus
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
			localStorage.setItem('My-Status',JSON.stringify(state.isActivated))


			
		},
		clearChatHistory(state,action){			
				localStorage.removeItem('My-Chat');
				state.chatlist=INITIAL_STATE.chatlist;
				state.isActivated=false;
		
		}
		

	}
	
});
export const MessageAction = ChatMessageSlice.actions;
export default ChatMessageSlice.reducer;
