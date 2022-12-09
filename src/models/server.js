const express = require("express");
const corse = require("cors");
const logger = require('morgan');
const { dbConection } = require("../db/config");
const { socketController } = require('../sockets/controller');
const colors = require('colors');
const { UserSocket } = require('../sockets/services/UserSocket');

class Server {
    constructor() {
        this.port = process.env.PORT;
        this.host = process.env.HOST;
        this.app = express();
        this.server = require("http").createServer(this.app);
        const witheList = [];
        for (let i = 1000; i <= 10000; i++) {
            witheList.push(`http://localhost:${i}`);
        }
        witheList.push("http://localhost");
        this.io = require("socket.io")(this.server, {
            cors: {
                origin: witheList,
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                allowedHeaders: "Content-Type, Authorization, Content-Length, X-Requested-With",
                credentials: true,
            },
        });
        this.middlewares();
        this.dataBase();
        this.userRoutes = "/api/user";
        this.publishRoutes = "/api/publish";
        this.friendRoutes = "/api/friend";
        this.authPath = "/api/auth";
        this.routes();
        this.sockets();
    }

    routes() {
        this.app.use(this.authPath, require("../routes/auth.js"));
        this.app.use(this.userRoutes, require("../routes/users"));
        this.app.use(this.publishRoutes, require("../routes/publish"));
        this.app.use(this.friendRoutes, require("../routes/friend"));
    }

    async dataBase() {
        await dbConection();
    }

    middlewares() {
        this.app.use(corse({ origin: "*" }));
        this.app.use(logger('dev'));
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    sockets() {
        const userSocket = new UserSocket();
        const self = this;
        this.io.on("connection", function (socket) {
            userSocket.addUser(socket.id, socket.handshake.auth.user);
            self.io.sockets.emit("userOnline", userSocket.getUsers().map(ch => ch.idMongo))
            socketController(socket, userSocket, self);
        });
    }

    laucher() {
        this.server.listen(this.port, () => {
            console.log(colors.bgWhite.black(`Server is running on port ${this.port}`));
        });
    }
}

module.exports = Server;