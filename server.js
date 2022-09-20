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

    fs.readFile("db.json", (error, data)=>
    {
        let parseJSON = JSON.parse(data);
        let stringJSON = JSON.stringify(parseJSON[`${pathLink}`]);

        console.log(stringJSON);
    })

});


app.listen(PORT,()=>{console.log("Started");});