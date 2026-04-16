import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: [],
  messagesHasMore: true,
  messagesLoading: false,
  totalMessagesCount: 0,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
    resetMessages: (state) => {
      state.messages = [];
      state.messagesHasMore = true;
      state.totalMessagesCount = 0;
    },
  },
  extraReducers: (builder) => {
    // send message
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload?.responseData];
      state.buttonLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // get messages
    builder.addCase(getMessageThunk.pending, (state) => {
      state.messagesLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      const { messages = [], totalCount = 0, hasMore = false } = action.payload?.responseData || {};
      // For infinite scroll: prepend old messages (in reverse order to maintain display order)
      state.messages = [...messages.reverse(), ...state.messages];
      state.messagesHasMore = hasMore;
      state.totalMessagesCount = totalCount;
      state.messagesLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.messagesLoading = false;
    });
  },
});

export const { setNewMessage, resetMessages } = messageSlice.actions;

export default messageSlice.reducer;
