import { createSlice } from "@reduxjs/toolkit";

const ChatButtonSlice = createSlice({
    name:"chatbutton",
    initialState:{
        isActivated:false
    },
    reducers:{
            activateChatButton(state,action){
                state.isActivated = ! state.isActivated;
            }
    }
})
export const ChatButtonActions = ChatButtonSlice.actions;
export default ChatButtonSlice.reducer;