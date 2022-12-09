const { Friend, User } = require("../../models/index");

const addMessage = async (data) => {
    const chat = await Friend.findById(data.chatId);
    const user = await User.findById(data.from);
    const menssage = {
        user: user,
        message: data.message.message,
        multimedia: data.multimedia
    };
    chat.messages.push(menssage);
    let response = await chat.save();
    console.log(response);
    return response;
};

module.exports = {
    addMessage
};
