// const prepareChatsData = async (dispatch: Dispatch) => {
//   const chats = (await getChatsDB()) as ChatType[];
//   const lastMessagePS = chats?.map((chat) =>
//     getLastMessageDB(chat.id).then((msg) => msg?.body || null),
//   );
//   const lastMessages = await Promise.all(lastMessagePS);

//   const chatsData = chats?.map((chat, index) => ({
//     ...chat,
//     message: lastMessages[index],
//   }));

//   return dispatch(addChats(chatsData));
// };

