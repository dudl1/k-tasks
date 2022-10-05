const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");
const { v4: uuid4 } = require("uuid");


const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


const users = {};
io.on("connection", (socket)=>
{
    const id = uuid4();
    users[id] = io;

    fs.readFile("db.json", function(error, data)
    {
        const dataJSON = data.toString();
        socket.send(JSON.parse(dataJSON));
    })

    socket.on("chat message", (msg)=>
    {
        io.emit("message", msg);

        fs.readFile("db.json", function(error, data)
        {
            let json = data.toString();
            let link = msg.link;

            json = JSON.parse(json);
            json[link].push(msg);

            const strJSON = JSON.stringify(json);

            fs.writeFile('db.json', strJSON, function(err){})
        })

    });

    /*socket.on("delete", (id)=>
    {
        io.emit("message", id.id);

        fs.readFile("db.json", function(error, data)
        {
            let json = data.toString();
            json = JSON.parse(json);

            let pathLink = id["link"];
            let pathId = id["id"];
            let pathToDelete = json[`${pathLink}`];

            for (let i = 0; i < pathToDelete.length; i++) {
                pathToDelete.splice(i, 1);
            }

            const strJSON = JSON.stringify(json);
            fs.writeFile('db.json', strJSON, function(err){})
        })
    });*/

    /*socket.on("close", ()=>
    {
        delete users[id];
    })*/
})

server.listen(PORT, () => { console.log("Start");});