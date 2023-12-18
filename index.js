const http = require("http");
const express = require("express");
const path = require("path");
const {Server} = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = new Server(server);


//SOCKET.IO
// socoket means client (info about client);
io.on("connection", (socket) => {
    //console.log("SCOKET IO OKAY", socket.id);
    socket.on("user-message", (message)=> {
        io.emit('message', message);  // giving msg to other user also
    });
});

// for using frontend (kind off EJS type);
app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html");
})

server.listen(2701, () => {
    console.log("API RUNNING");
})

