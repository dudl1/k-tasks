const express = require("express"),
      fs = require("fs");

const PORT = process.env.PORT || 80;

const app = express();
const jsonParser = express.json();
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) =>
{
    res.sendFile(__dirname + "/views/index.html",'utf-8');
});

app.post("/:link", (req, res) =>
{
    let link = req.params;

    let pathLink = link.link;
    let userMsg = req.body.userMsg;

    const addMsg = {
        "id": Date.now(),
        "msg": userMsg
    }

    function writeMsg(addMsg)
    {
        fs.readFile("db.json", function(error, data)
        {

            let json = data.toString();
            json = JSON.parse(json);
            console.log(json);

            json.economy.push(addMsg);

            const str = JSON.stringify(json);

            fs.writeFile('db.json', str, function(err)
            {
                console.log('---------- успешно добавлено -------------');
            })
        })
    }
    writeMsg(addMsg);
});


app.listen(PORT,()=>{console.log("Started");});