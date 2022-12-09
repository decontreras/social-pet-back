const { addMessage } = require("./services/chat-service");

const socketController = async (socket, userSocket, self) => {
  socket.on("activateChat", async (data) => {
    userSocket.addChat(socket.id, data.chatId.chatId);
  });
  socket.on("inactivateChat", async () => {
    userSocket.removeChat(socket.id);
  });
  socket.on("activateRoom", async () => {
    userSocket.activateRoom(socket.id, true);
  });
  socket.on("inactivateRoom", async () => {
    userSocket.activateRoom(socket.id, false);
  });
  socket.on("disconnect", () => {
    userSocket.deleteUser(socket.id);
    self.io.sockets.emit("userOnline", userSocket.getUsers().map(ch => ch.idMongo));
  });
  socket.on("sendMessage", async (data) => {
    const chatReturn = await addMessage(data);
    const user = userSocket.getUsers().find((userFind) => userFind.idMongo == data.to);
    if (user?.idChat) {
      socket.to(user.id).emit("sendMessage", chatReturn);
    } else if (user?.activateRoom) {
      //socket.to(user.id).emit("reciveMessageGeneral", await getAllChatsLogic(user.idMongo));
    } else if (!user) {
      //notification
    } else if (user) {
      socket.to(user.id).emit("newMessage");
    }
  });
};

module.exports = {
  socketController,
};
