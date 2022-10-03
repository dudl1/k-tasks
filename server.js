const express = require("express"),
      io = new Server(server),
      fs = require("fs");

const app = express();
const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//const users = {};
/*io.on("connection", (socket)=>
{
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

    socket.on("close", ()=>
    {
    })
})*/


app.listen(PORT,()=>{console.log("Started");});
