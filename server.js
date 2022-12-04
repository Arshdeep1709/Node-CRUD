const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3700;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/submit", function(req,res){
     console.log(req.body)
     res.send("Done")
})


app.listen(port, ()=> console.log("Connected"))
