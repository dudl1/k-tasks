const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");
//const mysql = require("mysql");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuid4 } = require("uuid");


app.use(express.static('views'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const supabase = createClient("https://stdagbjnbaqoqqcegdxl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZGFnYmpuYmFxb3FxY2VnZHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwNzQwMDgsImV4cCI6MTk4MDY1MDAwOH0.Pco-pMC-jH9UGxgF889G0SjaQfnNK4SG_RkB3UH8s0s");

/*const db = mysql.createConnection({
    host: "sql11.freesqldatabase.com",
    database: "sql11524632",
    user: "sql11524632",
    password: "7H9l6UakR4"
})*/

const users = {};
io.on("connection", (socket)=>
{
    const id = uuid4();
    users[id] = io;

    const displayData = async ()=>
    {
        let { data, error } = await supabase
            .from("main")
            .select("*");
    
        const jsonParse = JSON.parse(JSON.stringify(data));
        jsonParse.forEach(v=> socket.send(v));
    }
    displayData();

    /*db.connect(err=>
        {
            db.query("SELECT * FROM main", function(err, result, fields)
            {
                const jsonParse = JSON.parse(JSON.stringify(result));
                jsonParse.forEach(v=> socket.send(v));
            })
    })*/

    /*fs.readFile("db.json", function(error, data)
    {
        const dataJSON = data.toString();
        socket.send(JSON.parse(dataJSON));
    })*/
    socket.on("chat message", (msg)=>
    {
        io.emit("message", msg);

        const addData = async ()=>
        {
            let { data, error } = await supabase
                .from("main")
                .insert([{
                    id: msg.id,
                    link: msg.link,
                    userName: msg.userName,
                    msg: msg.msg,
                    typeCalendar: msg.typeCalendar,
                    dateTo: msg.dateTo,
                    file: msg.file
                }]);
        }
        addData();

        /*let addJSON = `"${msg.link}", "${msg.msg}", "${msg.typeCalendar}", "${msg.dateTo}"`;
        db.connect(err=>
            {
                db.query(`INSERT INTO main (link, msg, typeCalendar, dateTo) VALUES (${addJSON})`, function(err, result, fields){});
        })*/

        /*fs.readFile("db.json", function(error, data)
        {
            let json = data.toString();
            let link = msg.link;

            json = JSON.parse(json);
            json[link].push(msg);

            const strJSON = JSON.stringify(json);

            fs.writeFile('db.json', strJSON, function(err){})
        })*/
    });

    socket.on("delete", (id)=>
    {
        io.emit("message", id.id);

        const deleteData = async ()=>
        {
            let { data, error } = await supabase
                .from("main")
                .delete()
                .match({id: id.id})
        }
        deleteData();

        /*let deleteJSON = `${id.id}`;
        db.connect(err=>
            {
                db.query(`DELETE FROM main WHERE id="${deleteJSON}"`, function(err, result, fields){});
        })*/

        /*fs.readFile("db.json", function(error, data)
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
        })*/
    });

    socket.on("disconnect", ()=>
    {
        delete users[id];
    })
    
})

server.listen(process.env.PORT || 80, () => { console.log("Start");});