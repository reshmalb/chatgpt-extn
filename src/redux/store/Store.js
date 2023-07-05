import {configureStore} from '@reduxjs/toolkit';
import chatMessageReducer from '../slice/ChatMessagesSlice'
import chatButtonReducer from '../slice/ChatButtonSlice';



const store = configureStore({
    reducer:{
        chatmessages : chatMessageReducer

    }
})

export default store;