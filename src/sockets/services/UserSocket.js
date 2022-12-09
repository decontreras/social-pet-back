class UserSocket {
  constructor() {
    this.users = [];
  }
  addUser(id, idMongo) {
    let userSearch = this.users.find((user) => user.idMongo === idMongo);
    if (!userSearch) {
      this.users.push({ id, idMongo });
    }
  }

  addChat(id, idChat) {
    let userSearch = this.users.find((user) => user.id === id);
    if (userSearch) {
      userSearch.idChat = idChat;
      this.users = this.users.filter((user) => user.id != id);
      this.users.push(userSearch);
    }
  }

  removeChat(id) {
    let userSearch = this.users.find((user) => user.id === id);
    delete userSearch.idChat;
    this.users = this.users.filter((user) => user.id != id);
    this.users.push(userSearch);
  }

  activateRoom(id, activateRoom) {
    let userSearch = this.users.find((user) => user.id === id);
    if (userSearch) {
      userSearch.activateRoom = activateRoom;
      this.users = this.users.filter((user) => user.id != id);
      this.users.push(userSearch);
    }
  }

  deleteUser(id) {
    let userSearch = this.users.find((user) => user.id === id);
    if (userSearch) {
      this.users = this.users.filter((user) => user.id !== id);
    }
  }

  getUsers() {
    return this.users;
  }

}

module.exports = {
  UserSocket,
};
